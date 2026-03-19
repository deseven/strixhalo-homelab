# vLLM

[@lhl](https://github.com/lhl) got implemented the [first public vLLM build recipe](https://github.com/lhl/strix-halo-testing/tree/main/vllm) and shortly after Discord member @ssweens created Arch-based dockerfiles. [@kyuz0](https://github.com/kyuz0) adapted these into a [amd-strix-halo-vllm-toolboxes](https://github.com/kyuz0/amd-strix-halo-vllm-toolboxes) and that is probably the easiest way currently (2025-09-13) to bring up vLLM on Strix Halo.

2026-03-20: There are some recent notes/scripts for building vLLM from source here: https://github.com/paudley/ai-notes/tree/main/strix-halo

## Current Status

While vLLM can be built, and runs for basic models like llama2, newer models (gpt-oss for example) or those with different kernel/code dependencies may not work.

## Build Steps

A general description if you want to build vLLM. You should work in a clean env if possible:

- First have ROCm setup (latest prod or TheRock build should be ok)
- Build a [PyTorch w/ AOTriton support](https://github.com/lhl/strix-halo-testing/tree/main/torch-therock) - currently, TheRock PyTorch builds do not have this, so you need to build your own
- [Build vLLM](https://github.com/lhl/strix-halo-testing/blob/main/vllm/01-build-vllm.sh) - there are many patches you might need to apply
  - use_existing_torch.py
  - Add gfx1151 to CMakeLists.txt
  - build isolation fixes
  - patch out amdsmi (not gfx1151 compatible)
  - `pip install -e . --no-build-isolation`
  - either set constraints or reinstall torch/triton after as some intermediate steps may try to overwrite; alternatively you can `--no-deps` or manual installs of some packages but life is short
