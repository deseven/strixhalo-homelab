# llama.cpp with ROCm

> [!WARNING]
> This is a technical guide and assumes a certain level of technical knowledge. If there are confusing parts or you run into issues, I recommend using a strong LLM with research/grounding and reasoning abilities (eg Claude Sonnet 4) to assist.

While Vulkan can sometimes have faster `tg` speeds, it can run into "GGGG" issues in many situations, and if you want the fastest `pp` speeds, you probably will want to try the ROCm backend.

As of August 2025, the generally fastest/most stable llama.cpp ROCm combination:
- build llama.cpp with rocWMMA: `-DGGML_HIP_ROCWMMA_FATTN=ON`
- run llama.cpp with env to use hipBLASlt: `ROCBLAS_USE_HIPBLASLT=1`

There are still some GPU hangs, see: 
- https://github.com/ROCm/ROCm/issues/5151

If you are looking for pre-built llama.cpp ROCm binaries, first check out:
- Lemonade's [llamacpp-rocm](https://github.com/lemonade-sdk/llamacpp-rocm) - automated [builds](https://github.com/lemonade-sdk/llamacpp-rocm/releases) against the latest ROCm pre-release for gfx1151,gfx120X,gfx110X ([rocWMMA in progress](https://github.com/lemonade-sdk/llamacpp-rocm/issues/7))
- kyuz0's [AMD Strix Halo Llama.cpp Toolboxes](https://github.com/kyuz0/amd-strix-halo-toolboxes) container builds
- [nix-strix-halo](https://github.com/hellas-ai/nix-strix-halo) - Nix flake

## Building llama.cpp with ROCm
If you want or need to build it yourself, you can basically just follow the [llama.cpp build guide](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md#hipblas):

```
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp

# build w/o rocWMMA
cmake -S . -B build -DGGML_HIP=ON -DAMDGPU_TARGETS=gfx1151 -DCMAKE_BUILD_TYPE=Release && cmake --build build --config Release -- -j$(nproc)

# really, you want to build w/ rocWMMA
cmake -B build -S . -DGGML_HIP=ON -DAMDGPU_TARGETS="gfx1151" -DGGML_HIP_ROCWMMA_FATTN=ON && time cmake --build build --config Release -j$(nproc)

# after about 2 minutes you should have a freshly baked llama.cpp in build/bin:
build/bin/llama-bench --mmap 0 -fa 1 -m /models/gguf/llama-2-7b.Q4_K_M.gguf
```

Of course, to build, you need some dependencies sorted.

First, you should run the latest Linux (6.16+) and linux-firmware (git).

## ROCm
You'll need ROCm installed first before you can build. For best performance you'll want to use the latest ROCm/TheRock nightlies. See: [AI_Capabilities_Overview](./AI_Capabilities_Overview.md#rocm)


To build, you may need to make sure your environment variables are properly set. If so, take a look at [https://github.com/lhl/strix-halo-testing/blob/main/rocm-therock-env.sh](https://github.com/lhl/strix-halo-testing/blob/main/rocm-therock-env.sh) for an example of what this might look like. Change `ROCM_PATH` to whatever your ROCm path is.

## rocWMMA

> [!WARNING]
> As of ROCm 7.0.2+ the ROCWMMA flag/path *SHOULD NOT BE USED* for Strix Halo with llama.cpp upstream - it's slower than the regular ROCm/HIP path as context depth increases and is not receiving any updates until a rewrite happens

Your ROCm probably has the rocWMMA libraries installed already. If not, you'll want them in your rocm folder. This is relatively straightforward (we only need the library installed, but you can refer to [https://github.com/lhl/strix-halo-testing/blob/main/arch-torch/02-build-rocwwma.sh](https://github.com/lhl/strix-halo-testing/blob/main/arch-torch/02-build-rocwwma.sh) for building this.

## 2025-10-31 rocWMMA
If you are building your own ROCm rocWMMA build, be sure to take a look at [llama-cpp-fix-wmma](https://github.com/lhl/strix-halo-testing/tree/main/llama-cpp-fix-wmma) - there is a [rocm-wmma-tune branch](https://github.com/lhl/llama.cpp/tree/rocm-wmma-tune) that performs significantly better at longer context depths.
- Fullest writeup with all relevant links is here: https://www.reddit.com/r/LocalLLaMA/comments/1ok7hd4/faster_llamacpp_rocm_performance_for_amd_rdna3/
