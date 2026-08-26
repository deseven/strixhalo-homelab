# Fine-tuning eval

If you're fine-tuning an LLM on Strix Halo with the HuggingFace Trainer and you've left `evaluation_strategy="steps"` enabled, every eval will peg all 32 logical cores at 100% for 5–10 minutes while the GPU sits at ~30–40% utilization. The training itself is fine; the eval is what breaks.

This is a kernel-level issue, not a Trainer bug. Skipping or moving eval out-of-process is the practical fix.

## Symptom

During `Trainer.evaluate()`:

- All CPU cores pegged at 100%, sustained
- GPU at modest utilization (30–40%) — eval is CPU-bound, not GPU-bound
- `perf top` shows `flush_tlb_func` + `call_function_single_interrupt` dominating
- Training steps don't trigger it; only eval

A 5–10 minute eval after every checkpoint makes long training runs infeasible — you spend more wall-clock time in eval than in training.

## Why

Strix Halo's `/proc/cpuinfo` does NOT list the `invlpgb` flag, despite Zen 5 architecturally supporting it. Without `INVLPGB`, every TLB shootdown the kernel issues is a per-CPU IPI. Combined with the kernel's `mm/vmscan.c` reclaim path — which batches dirty folios into pagevecs of size `PAGEVEC_SIZE = 31` and fires `try_to_unmap_flush_dirty` every batch — the page churn during eval-mode forward passes generates thousands of IPIs/sec/core. All cores spend their cycles servicing each other's shootdowns instead of doing useful work.

Whether `INVLPGB` is intentionally not exposed on Strix Halo silicon, or whether it's a kernel/microcode detection gap, is still open. Filed as a question to AMD's kernel team at [ROCm/ROCm#6297](https://github.com/ROCm/ROCm/issues/6297) — if you have an AMD contact, point them at it.

> [!NOTE]
> The same TLB-shootdown pattern hits any heavy-page-churn workload on Strix Halo, just less obviously. Eval is the most reliable trigger because the Trainer process churns through a lot of dirty pages in a short window.

## Workaround — out-of-process eval via `llama-perplexity`

`llama-perplexity` (part of `llama.cpp`) loads the model fresh per invocation rather than holding it in a long-lived Python process that accumulates dirty pages. No accumulated pressure, no storm. The pattern:

1. In your training script, disable in-process eval entirely: `evaluation_strategy="no"`
2. After every `save_steps` checkpoint, convert the LoRA adapter to GGUF (or merge into base and convert the merged model)
3. Run `llama-perplexity -m <base.gguf> --lora <adapter.gguf> -f <eval.txt>` against your held-out eval set
4. Parse the perplexity number out of the output, append to your own `eval_history.jsonl`

A working reference implementation of this pattern — orchestrator wiring, GGUF conversion, perplexity extraction, the lot — is documented at:

- [strix-halo-llm-finetune-guide — Step 7b "Storm-free eval via llama-perplexity"](https://github.com/h34v3nzc0dex/strix-halo-llm-finetune-guide#step-7b--storm-free-eval-via-llama-perplexity)
- Implementation: `scripts/eval_via_llama_perplexity.py` in the same repo

## What's still open

- Is `INVLPGB` exposure on Strix Halo a kernel detection bug or a silicon-side decision? Tracking via [ROCm/ROCm#6297](https://github.com/ROCm/ROCm/issues/6297). If you have data on whether Strix Point (gfx1150) or Krackan Point (gfx1152) show the same `invlpgb: 0` in `/proc/cpuinfo`, that would help narrow it down.
- Tuning `PAGEVEC_SIZE = 31` (structural in `include/linux/pagevec.h`) would proportionally cut the IPI rate on no-`INVLPGB` boxes. Real upstream `mm/` work; not packaged as a sysctl knob today.

## Related

- [llamacpp-with-ROCm](./llamacpp-with-ROCm.md) — the ROCm build llama-perplexity comes from
- [AI_Capabilities_Overview](./AI_Capabilities_Overview.md) — broader hardware/software context
