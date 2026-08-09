# AI Capabilities Overview

> [!WARNING]
> This guide is a work in progress. Also, there has been ongoing progress with software quality and performance so please be aware that some of this information may become rapidly out of date.

## Intro
Strix Halo can be a capable local LLM inferencing platform. With up to 128GiB of shared system memory (LPDDR5x-8000 on a 256-bit bus) and a theoretical bandwidth limit of 256GiB/s (double most PC desktop and APU platforms) it is well suited for running quantized medium sized (~30B) dense models as well as large 100B+ parameter sparse Mixture-of-Experts (MoE) models.

There have been some wild claims made on Strix Halo's AI capabilities, so it's important to put this in context. 256GiB/s of MBW is still much lower than most mid-range dGPUs. As a point of reference, a 3060 Ti has 448 GiB/s of MBW. Also, the Strix Halo GPU uses an RDNA3.5 architecture (gfx1151), which for AI is sub-optimal architecturally. For compute and memory bandwidth, you can think of the Strix Halo GPU like a [Radeon RX 7600 XT](https://www.techpowerup.com/gpu-specs/radeon-rx-7600-xt.c4190), but with up to 124GiB+ of VRAM.

Vulkan works well for Strix Halo on Windows and Linux (both Mesa RADV and AMDVLK), but as of August 2025, its ROCm support is still immature and incomplete, and you may find running other AI/ML tasks (training, image/video generation) slow or impossible. 

If you are doing more than running common desktop inferencing software (llama.cpp, etc), then you will want to do some careful research.

### GPU Compute
For the 40CU Radeon 8060S at a max clock of 2.9GHz, the 395 Strix Halo should have a peak of 59.4 FP16/BF16 TFLOPS:
```
512 ops/clock/CU * 40 CU * 2.9e9 clock / 1e12 = 59.392 FP16 TFLOPS
```

For more information on how RDNA3 does its tensor math, see this article on  [WMMA on RDNA3](https://gpuopen.com/learn/wmma_on_rdna3/).

| Type       | RDNA3              | RDNA4/sparse           |
|------------|--------------------|------------------------|
| FP16/BF16  | 512 ops/cycle      | 1024/2048 ops/cycle    |
| FP8        | N/A                | 2048/4096 ops/cycle    |
| INT8       | 512 ops/cycle      | 2048/4096 ops/cycle    |
| INT4       | 1024 ops/cycle     | 4096/8192 ops/cycle    |

In practice, as of 2025-08, Strix Halo's tested performance is substantially lower what should be theoretically achievable. You can track performance progress via these issues:
- https://github.com/ROCm/ROCm/issues/4748
- https://github.com/ROCm/ROCm/issues/4499

### Comparison to other available options
There are not that many options for those looking for 96GB+ of VRAM, annd among its competition, Strix Halo is well priced:

| Spec                      | AMD Ryzen AI Max Plus 395     | Apple Mac Studio M4 Max         | NVIDIA DGX Spark                           | NVIDIA RTX PRO 6000 |
|---------------------------|------------------------------|----------------------------------|---------------------------------------------|---------------------|
| **Release Date**          | Spring 2025                   | March 12, 2025                   | October 2025                                 | May 2025           |
| **Price**                 | $2,000                        | $3,499                           | $4,000                                     | $8,200              |
| **Power (Max W)**         | 120                           | 300+                             | 240                                          | 600                 |
| **CPU**                   | 16x Zen5 5.1 GHz           | 16x M4 4.5 GHz                 | 10x Arm Cortex-X925, 10x Arm Cortex-A725  |                     |
| **GPU**                   | RDNA 3.5                      | M4                               | Blackwell                                   | Blackwell           |
| **GPU Cores**             | 40                            | 40                               | 192                                         | 752                 |
| **GPU Clock**             | 2.9 GHz                       | 1.8 GHz                          | 2.5 GHz                                     | 2.6 GHz             |
| **Memory**                | 128GB LPDDR5X-8000             | 128GB LPDDR5X-8533                | 128GB LPDDR5X-8533                        | 96GB GDDR7 ECC      |
| **Memory Bandwidth**      | 256 GB/s                       | 546 GB/s                          | 273 GB/s                                    | 1792 GB/s           |
| **FP16 TFLOPS**           | 59.39                         | 34.08                            | 62.5                                        | 251.90              |
| **FP8 TFLOPS**            |                               |                                  | 125                                         | 503.79              |
| **INT8 TOPS (GPU)**       | 59.39 (same as FP16)           | 34.08 (same as FP16)              | 250                                         | 1007.58             |
| **INT4 TOPS (GPU)**       | 118.78                        |                                  | 500                                         | 2015.16             |
| **INT8 TOPS (NPU)**       | 50                            | 38                               |                                             |                     |
| **Storage**               | 2-3x NVMe                     | 512GB (non-upgradable) + 3x TB5 (120 Gbps) | NVMe                                       |                     |

An NVIDIA RTX PRO 6000 (Blackwell) dGPU is included as a point of comparison - if you are willing to pay (significantly) more, you can get much better performance, but of course there are many other options if you are open to a bigger form factor, power envelope, or price point (usually all three).

## Setup
This isn't meant to be a comprehensive setup document. If there are pre-requisites or background that you're missing, it is recommended to feed this document into the strongest LLM you have [at your disposal](https://github.com/cheahjs/free-llm-api-resources), preferably one that has web search/grounding, and ask it for additional help.

### Basic System Setup
Most of the setup details in this doc are focused on Linux and may not apply for Windows. Here's some basic setup for Windows first:
- Vulkan should be installed with your AMD drivers so there's nothing to configure there. You can just download the [latest win-vulkan llama.cpp release](https://github.com/ggml-org/llama.cpp/releases) to start running LLM models. You can also optionally install a front-end like [Lemonade Server](https://lemonade-server.ai/), [Jan](https://jan.ai/), or [LM Studio](https://lmstudio.ai/) if you want a GUI
- You only need ROCm (w/ Strix Halo support) if you want to build or do ROCm development. In that case you should check [TheRock Releases](https://github.com/ROCm/TheRock/blob/main/RELEASES.md), but if you just want to try ROCm builds of the latest llama.cpp, you can download [the latest lemonade-sdk/llamacpp-rocm gfx1151 builds here](https://github.com/lemonade-sdk/llamacpp-rocm/releases)

For Linux, you can run any distro you want, but a **VERY IMPORTANT** few notes:
- The `amdgpu` drivers are built into the Linux kernel, and **for best results, you should make sure your kernel is 6.15+.** There are constant fixes and improvements to the newer the better, and older kernels are unlikely to have `amdgpu` drivers that work best with Strix Halo (gfx1151)
- You should also have the latest `linux-firmware` package. These are named differently per distro, but there are crucial stability fixes, so the more recent firmware package you have installed (including "git" packages for bleeding edge distros), the better
- You should install Mesa RADV and AMDVLK Vulkan drivers. You will probably also want to install `vulkan-tools` (for `vulkaninfo`) and `vulkan-headers` (if you want to build Vulkan packages) and each distro has their own names for those packages
- See the ROCm section below, but you basically want to install a gfx1151 TheRock/ROCm nightly build

Lemonade, TheRock (and tbt, most standard AI/ML workflows) standardize on using conda/mamba and it's highly recommended to [install them](https://github.com/conda-forge/miniforge?tab=readme-ov-file#requirements-and-installers) if you plan on doing more than basic LLM inference.

### Docker Images
There are a lot of Docker images available that may also be useful:
- https://strix-halo-toolboxes.com - probably the easiest way to set things up w/ Vulkan an ROCm backends, including text, image and video generation with llama.cpp, vLLM and ComfyUI
- https://github.com/shantur/strix-rocm-all - clear setup scripts for getting Unsloth installed

### Memory Limits
For the Strix Halo GPU, the unified memory is either assigned as GART, which is a fixed reserved aperture set exclusively for the GPU in the BIOS, and GTT, which is a dynamically allocable amount of memory. In Windows, this should be automatic (but is limited to 96GB). In Linux, it can be set via boot configuration up to the point of system instability.

As long are your software supports using GTT, for AI purposes, you are probably best off setting GART to the minimum (eg, 512MB) and then allocating automatically via GTT. In Linux, you can add this to your boot options, or you can create a conf in your `/etc/modprobe.d/` (like `/etc/modprobe.d/amdgpu_llm_optimized.conf`):

```
### IF YOU CUT AND PASTE THIS IT WILL DO NOTHING. 
### YOU MUST READ AND UNCOMMENT TO ENABLE.

## This is a legacy setting maybe referenced by old software (set to 120GiB) but isn't used by Linux to specify anything
# options amdgpu gttsize=122800

## This specifies GTT by # of 4KB pages:
##   31457280 * 4KB / 1024 / 1024 = 120 GiB
## We leave a buffer of 8GiB on the limit to try to keep your system from crashing if it runs out of memory
# options ttm pages_limit=31457280

## Optionally we can pre-allocate any amount of memory. This pool is never accessible to the system.
## You might want to do this to reduce GTT fragmentation, and it might have a perf improvement.
## If you are using your system exclusively to run AI models, just max this out to match your pages_limit.
## This example specifies 60GiB pre-allocated.
# options ttm page_pool_size=15728640
```

If your GPU driver loads from initramfs, you should regenerate it after making the changes, otherwise they won't be applied. (A strong code LLM should have no problem helping you determine/do that for you specific distro/setup if you need help w/ this).

`amdgpu.gttsize` is an [officially deprecated](https://www.mail-archive.com/amd-gfx@lists.freedesktop.org/msg117333.html) parameter that may be referenced by some software, so it's best to still set it to match, but GTT allocation in Linux is now actually handled by the Translation Table Maps (TTM) memory management subsystem.
- `pages_limit` sets the maximum number or 4KiB pages that can be used for GPU memory.
- `page_pool_size` pre-caches/allocates the memory for usage by the GPU. (This will not be available for your system). In theory you could set this to 0, but if you are looking for the maximum performance (minimizing fragmentation), then you can set it to match the `pages_limit` size.

You can increase the limits as high as you want, but you'll want to make sure you reserve enough memory for your OS/system.

If you are setting `page_pool_size` lower than the `pages_limit` you may want to try increasing, eg `amdgpu.vm_fragment_size=8` (4=64K default, 9=2M) to allocate in bigger chunks.

### ROCm
The latest release version of ROCm (6.4.3 as of this writing) has both rocBLAS and hipBLASlt support for Strix Halo gfx1151. For the most up-to-date builds, you can also install the latest gfx1151 [TheRock/ROCm "nightly" release](https://github.com/ROCm/TheRock/blob/main/RELEASES.md). These can be found at [https://therock-nightly-tarball.s3.amazonaws.com/](https://therock-nightly-tarball.s3.amazonaws.com/) (find the filename) or you can use the helper scripts described in the [Releases page](https://github.com/ROCm/TheRock/blob/main/RELEASES.md).

### Performance Tips
- If you are not using VFIO or any type of GPU passthrough, you should set `amd_iommu=off` in your kernel options for ~6% faster memory reads (actuall impact on llama.cpp tg performance tends to be smaller, about <2%. Note that when tested, `iommu=pt` does not give any speed benefit. There are some caveats
    - The AMD XDNA NPU driver explicitly does not support running without an IOOMU so `/dev/accel/accel0` would likely disappear
    - Both USB4 controllers currently use IOMMU DMA production and disabling it would remove [protection against unauthorized device DMA](https://www.kernel.org/doc/html/latest/admin-guide/thunderbolt.html#dma-protection-utilizing-iommu)
    - It also disabled interrupt remapping and device isolation system-wide (so a no-go if you're using VMs or similar), see also the [AMD ROCm IOMMU guidance](https://rocm.docs.amd.com/en/docs-6.3.1/conceptual/iommu.html) - they recommend `iommu=pt` (but as mentioned, no inference performance improvement was observed in testing)
- You can improve further improve performance with [tuned](https://tuned-project.org/) and switching to the `accelerator-performance` profile:
  - Raises raw Vulkan memory bandwidth performance by about 3%
  - Seems to have minimal effect on `tg` but improves llama.cpp `pp512` performance by 5-8% (!!!)
```
paru -S tuned
sudo systemctl enable --now tuned
tuned-adm list
# - accelerator-performance     - Throughput performance based tuning with disabled higher latency STOP states
sudo tuned-adm profile accelerator-performance
tuned-adm active
# Current active profile: accelerator-performance
```
- If you are loading large models (more than half your RAM) on llama.cpp , yous hould be sure to disable mmap as it's marginally bad for Vulkan model loading performance, but catastrophically bad for ROCm (large models can take hours to load).  You should use the appropriate command option (differs based on specific llama.cpp binary) to disable mmap in general for Strix Halo.
- Again for llama.cpp, be sure to use `–ngl 99` (or 999 if >99 layers) to load all layers into the GPU-addressable space. While its technically "shared" memory, in practice, CPU memory bandwidth is only half of the GPU mbw due to Strix Halo's memory architecture (I’ve heard due to GMI link design, but the practical part is you’re going to have much lower CPU vs GPU mbw).


## LLMs
The recommended way to run LLMs is with [llama.cpp](https://github.com/ggml-org/llama.cpp) or one of the apps that leverage it like [LM Studio](https://lmstudio.ai/) with the Vulkan backend.

AMD has also been sponsoring the rapidly developing [Lemonade Server](https://lemonade-server.ai/) - an easy-to-install, all-in-one package that leverages the latest builds of software (like llama.cpp) and even provides NPU/hybrid inferencing on Windows. If you're new or unsure on what to run, you might want to check that out first.

One of our community members, kyuz0, also maintains a [AMD Strix Halo Llama.cpp Toolboxes](https://github.com/kyuz0/amd-strix-halo-toolboxes) which has Docker builds of all llama.cpp backends.

Performance has been improving and several of our community members have been running extensive LLM inferencing benchmarks on many models:
- https://kyuz0.github.io/amd-strix-halo-toolboxes/ - an interactive viewer of standard pp512/tg128 results
- https://github.com/lhl/strix-halo-testing/tree/main/llm-bench - graphs and sweeps of pp/tg from 1-4096 for a variety of architectures

NOTE: Ollama does not support Vulkan or AMD GPUs in general very well in general. For this and other reasons, it is not recommended.

### llama.cpp
The easiest way to get llama.cpp to work is with the Vulkan backend. This reliable and relatively performant on both Windows and Linux and you can either [build it yourself](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md#vulkan) or simply [download the latest release](https://github.com/ggml-org/llama.cpp/releases) for your OS.
- For Vulkan on Linux, you should install both the AMDVLK and Mesa RADV drivers. When both are installed AMDVLK will be the default Vulkan driver, which is generally fine as it's `pp` can be up to 2X faster than Mesa RADV. You can set `AMD_VULKAN_ICD=RADV` to switch to the RADV to compare. The latter tends to have slightly higher `tg` speed, hold up better in long context, and be slightly more reliable, so you should test both and see which works better for you.

If you want to use the ROCm backend (the rocWMMA FA implementation in particular can offer huge (eg 2X) `pp` performance advantages vs Vulkan), the easiest way is to use kyuz0's [AMD Strix Halo Llama.cpp Toolboxes](https://github.com/kyuz0/amd-strix-halo-toolboxes) container builds or Lemonade's [llamacpp-rocm](https://github.com/lemonade-sdk/llamacpp-rocm) builds. If you're looking to build your own, please refer to: [[llamacpp-with-ROCm|AI/llamacpp-with-ROCm]]

If you are using the llama.cpp ROCm backend, you may want to also try to use the hipBLASlt kernel with the `ROCBLAS_USE_HIPBLASLT=1` environment variable as it is sometimes faster than the default rocBLAS kernels.

For more on how to test llama.cpp performance:
- [[AI/llamacpp-performance]]

### Additional Resources
 - Reproducible local LLM setup and benchmark evidence: [Strix Halo Guide](https://github.com/hogeheer499-commits/strix-halo-guide) - copyable Ubuntu, Vulkan/RADV, Ollama, and llama.cpp setup; structured benchmark claims; raw logs; failed paths; and cross-system community reproductions
 - Deep dive into LLM usage on Strix Halo: https://llm-tracker.info/_TOORG/Strix-Halo
 - Newbie Linux inference guide: https://github.com/renaudrenaud/local_inference
 - Ready to use Docker containers: https://github.com/kyuz0/amd-strix-halo-toolboxes
 - A nice writeup on using Lemonade on Ubuntu 25.04: https://netstatz.com/strix_halo_lemonade/
 - Another example of a setup with Lemonade and Open WebUI: https://sawansri.com/blog/private-ai/

## Image/Video Generation
For Windows you can give AMUSE a try. It's probably the easiest way to get started quickly: https://www.amuse-ai.com/

On Linux, using kyuz0's [AMD Strix Halo — ComfyUI Toolbox](https://github.com/kyuz0/amd-strix-halo-comfyui-toolboxes) is probably the easiest way to get up and running.

Here are some instructions for getting ComfyUI up and running on Windows: https://www.reddit.com/r/StableDiffusion/comments/1lmt44b/running_rocmaccelerated_comfyui_on_strix_halo_rx/

You can install sdui/sdnext using the TheRock [PyTorch nightlies](https://github.com/ROCm/TheRock/blob/main/RELEASES.md#installing-pytorch-python-packages). Currently they do not have FA, but if you want to build your own w/ aotriton FA, there are [build scripts in this repo](https://github.com/lhl/strix-halo-testing/tree/main/torch-therock).
