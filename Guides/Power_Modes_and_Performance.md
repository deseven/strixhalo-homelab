# Power Modes & Performance
This guide is supposed to show how the performance of the APU changes on various power levels and to help you pick the optimal power mode for your Strix Halo system.

All tests were run at fixed fans speed of 80% to make sure that cooling level is constant, CPU temp never exceeded 75 °C. For GPU becnhmarks please note that the GPU was in a passthrough mode to the Windows VM and only 12 CPU cores were passed as well, so there is at least 5% of a performance drop. In general, look at the percentage changes (relative to the base 55W result).

**Everything single-threaded is omitted here, since a single core could never use the full power limit even on the lowest 55W value.**

### CPU - PassMark
Details:
 - [PassMark PerformanceTest for Linux](https://www.passmark.com/products/pt_linux/download.php), version 11.0.1002
 - Average of 5 medium tests for CPU, to lower the influence of the initial power boost (`pt_linux_x64 -i 5 -d 2`)

| Metric | [55W](https://www.passmark.com/baselines/V11/display.php?id=509787657486) | [85W](https://www.passmark.com/baselines/V11/display.php?id=509787842837) | [120W](https://www.passmark.com/baselines/V11/display.php?id=509787902430) |
| ----------------------------------- | ------- | ------- | ------- |
| **CPU Mark**                        | **49 635** | **58 042 <sup style="color: #1fea00; font-size: 0.8em;">+16.9%</sup>** | **62 805 <sup style="color: #1fea00; font-size: 0.8em;">+26.5%</sup>** |
| Integer Math (MOps/s)               | 193 409 | 222 270 <sup style="color: #1fea00; font-size: 0.8em;">+14.9%</sup> | 233 483 <sup style="color: #1fea00; font-size: 0.8em;">+20.7%</sup> |
| Floating Point Math (MOps/s)        | 107 679 | 127 114 <sup style="color: #1fea00; font-size: 0.8em;">+18.0%</sup> | 138 255 <sup style="color: #1fea00; font-size: 0.8em;">+28.4%</sup> |
| Find Prime Numbers (MPrimes/s)      | 263 | 286 <sup style="color: #1fea00; font-size: 0.8em;">+8.7%</sup> | 302 <sup style="color: #1fea00; font-size: 0.8em;">+14.8%</sup> |
| Random String Sorting (kStrings/s)  | 71 735 | 88 253 <sup style="color: #1fea00; font-size: 0.8em;">+23.0%</sup> | 98 842 <sup style="color: #1fea00; font-size: 0.8em;">+37.8%</sup> |
| Data Encryption (MB/s)              | 33 582 | 40 310 <sup style="color: #1fea00; font-size: 0.8em;">+20.0%</sup> | 44 246 <sup style="color: #1fea00; font-size: 0.8em;">+31.8%</sup> |
| Data Compression (KB/s)             | 539 857 | 683 287 <sup style="color: #1fea00; font-size: 0.8em;">+26.6%</sup> | 777 048 <sup style="color: #1fea00; font-size: 0.8em;">+43.9%</sup> |
| Physics (Frames/s)                  | 4 802 | 5 477 <sup style="color: #1fea00; font-size: 0.8em;">+14.1%</sup> | 5 806 <sup style="color: #1fea00; font-size: 0.8em;">+20.9%</sup> |
| Extended Instructions (MMatrices/s) | 38 464 | 49 404 <sup style="color: #1fea00; font-size: 0.8em;">+28.4%</sup> | 58 761 <sup style="color: #1fea00; font-size: 0.8em;">+52.8%</sup> |
\* **all percentage values are relative to the base 55W result**


### CPU - Various Benchmarks
Details:
 - sysbench - 1.0.20, `sysbench cpu run --threads=32 --time=30`
 - cpubench1a - 5.0, `cpubench1a -bench -nb 3 -duration 30`
 - 7-Zip - 16.02, `7z b`

| Benchmark (Metric)         | 55W | 85W | 120W |
| -------------------------- | --- | --- | ---- |
| sysbench (Events/s)        | 85 160 | 96 139 <sup style="color: #1fea00; font-size: 0.8em;">+12.9%</sup> | 99 218 <sup style="color: #1fea00; font-size: 0.8em;">+16.5%</sup> |
| cpubench1a (MT Score)      | 3 483 | 4 288 <sup style="color: #1fea00; font-size: 0.8em;">+23.1%</sup> | 4 790 <sup style="color: #1fea00; font-size: 0.8em;">+37.5%</sup> |
| 7-Zip (Compressing MIPS)   | 120 759 | 135 008 <sup style="color: #1fea00; font-size: 0.8em;">+11.8%</sup> | 140 471 <sup style="color: #1fea00; font-size: 0.8em;">+16.3%</sup> |
| 7-Zip (Decompressing MIPS) | 103 110 | 124 170 <sup style="color: #1fea00; font-size: 0.8em;">+20.4%</sup> | 135 859 <sup style="color: #1fea00; font-size: 0.8em;">+31.8%</sup> |
\* **all percentage values are relative to the base 55W result**


### GPU - Various Benchmarks
Details:
 - UNIGINE Superposition - DirectX, 1080p Extreme preset
 - 3DMARK Steel Nomad Light - Vulkan, 1080p
 - 3DMARK Time Spy - 1080p

| Benchmark                | 55W | 85W | 120W |
| ------------------------ | --- | --- | ---- |
| PassMark 2D Mark         | 621 | 706 <sup style="color: #1fea00; font-size: 0.8em;">+13.7%</sup> | 758 <sup style="color: #1fea00; font-size: 0.8em;">+22.1%</sup> |
| PassMark DirectX 10      | 59 | 65 <sup style="color: #1fea00; font-size: 0.8em;">+10.2%</sup> | 78 <sup style="color: #1fea00; font-size: 0.8em;">+32.2%</sup> |
| PassMark DirectX 11      | 112 | 134 <sup style="color: #1fea00; font-size: 0.8em;">+19.6%</sup> | 148 <sup style="color: #1fea00; font-size: 0.8em;">+32.1%</sup> |
| PassMark DirectX 12      | 63 | 67 <sup style="color: #1fea00; font-size: 0.8em;">+6.3%</sup> | 80 <sup style="color: #1fea00; font-size: 0.8em;">+27.0%</sup> |
| PassMark GPU Compute     | 6 229 | 6 777 <sup style="color: #1fea00; font-size: 0.8em;">+8.8%</sup> | 7 311 <sup style="color: #1fea00; font-size: 0.8em;">+17.4%</sup> |
| UNIGINE Superposition    | 5 247 | 6 103 <sup style="color: #1fea00; font-size: 0.8em;">+16.3%</sup> | 6 522 <sup style="color: #1fea00; font-size: 0.8em;">+24.3%</sup> |
| 3DMARK Steel Nomad Light | 8 494 | 9 883 <sup style="color: #1fea00; font-size: 0.8em;">+16.4%</sup> | 10 608 <sup style="color: #1fea00; font-size: 0.8em;">+24.9%</sup> |
| 3DMARK Time Spy          | 8 891 | 10 230 <sup style="color: #1fea00; font-size: 0.8em;">+15.1%</sup> | 10 710 <sup style="color: #1fea00; font-size: 0.8em;">+20.5%</sup> |
\* **all percentage values are relative to the base 55W result**

### GPU - Gaming
Details:
 - all games use pre-defined presets and built-in benchmarks
 - all values are average FPS
 - for Metro Exodus ray tracing was additionally set to `normal`
 - for GTA5 the value is an average FPS of 5 different benchmarks

| Game                                           | 55W | 85W | 120W |
| ---------------------------------------------- | --- | --- | ---- |
| Cyberpunk 2077 (1080p low)                     | 61 | 70 <sup style="color: #1fea00; font-size: 0.8em;">+14.8%</sup> | 73 <sup style="color: #1fea00; font-size: 0.8em;">+19.7%</sup> |
| Cyberpunk 2077 (1080p high)                    | 53 | 62 <sup style="color: #1fea00; font-size: 0.8em;">+17.0%</sup> | 66 <sup style="color: #1fea00; font-size: 0.8em;">+24.5%</sup> |
| The Talos Principle (1080p ultra)              | 102 | 113 <sup style="color: #1fea00; font-size: 0.8em;">+10.8%</sup> | 117 <sup style="color: #1fea00; font-size: 0.8em;">+14.7%</sup> |
| Metro Exodus Enhanced Edition (1080p ultra)    | 51 | 59 <sup style="color: #1fea00; font-size: 0.8em;">+15.7%</sup> | 63 <sup style="color: #1fea00; font-size: 0.8em;">+23.5%</sup> |
| Red Dead Redemption 2 (1080p high)             | 55 | 58 <sup style="color: #1fea00; font-size: 0.8em;">+5.5%</sup> | 66 <sup style="color: #1fea00; font-size: 0.8em;">+20.0%</sup> |
| Grand Theft Auto V Enchanced (1080p very high) | 105 | 118 <sup style="color: #1fea00; font-size: 0.8em;">+12.4%</sup> | 137 <sup style="color: #1fea00; font-size: 0.8em;">+30.5%</sup> |
| Black Myth: Wukong (1080p high)                | 71 | 78 <sup style="color: #1fea00; font-size: 0.8em;">+9.9%</sup> | 84 <sup style="color: #1fea00; font-size: 0.8em;">+18.3%</sup> |
\* **all percentage values are relative to the base 55W result**

### GPU - LLM
Details:
 - koboldcpp, Vulkan, full GPU offloading
 - Q5_K_M

| Model (Metric)                              | 55W | 85W | 120W |
| ------------------------------------------- | --- | --- | ---- |
| Gemma 3 27B (Prompt Processing, Tokens/s)   | 77 | 89 <sup style="color: #1fea00; font-size: 0.8em;">+15.6%</sup> | 95 <sup style="color: #1fea00; font-size: 0.8em;">+23.4%</sup> |
| Gemma 3 27B (Generation Speed, Tokens/s)    | 6 | 6 <sup style="font-size: 0.8em;">+0.0%</sup> | 6 <sup style="font-size: 0.8em;">+0.0%</sup> |
| Qwen3 30B A3B (Prompt Processing, Tokens/s) | 92 | 95 <sup style="color: #1fea00; font-size: 0.8em;">+3.3%</sup> | 95 <sup style="color: #1fea00; font-size: 0.8em;">+3.3%</sup> |
| Qwen3 30B A3B (Generation Speed, Tokens/s)  | 25 | 29 <sup style="color: #1fea00; font-size: 0.8em;">+16.0%</sup> | 29 <sup style="color: #1fea00; font-size: 0.8em;">+16.0%</sup> |
\* **all percentage values are relative to the base 55W result**

### Conclusions
Let's look on the average increase between different modes for each category:

| Category                 | 55W -> 85W | 85W -> 120W | 55W -> 120W |
| ------------------------ | ---------- | ----------- | ----------- |
| CPU - PassMark           | <span style="color: #1fea00;">+19.0%</span> | <span style="color: #1fea00;">+11.8%</span> | <span style="color: #1fea00;">+30.8%</span> |
| CPU - Various Benchmarks | <span style="color: #1fea00;">+17.0%</span> | <span style="color: #1fea00;">+8.5%</span> | <span style="color: #1fea00;">+25.5%</span> |
| GPU - Various Benchmarks | <span style="color: #1fea00;">+13.3%</span> | <span style="color: #1fea00;">+11.7%</span> | <span style="color: #1fea00;">+25.0%</span> |
| GPU - Gaming             | <span style="color: #1fea00;">+12.3%</span> | <span style="color: #1fea00;">+9.3%</span> | <span style="color: #1fea00;">+21.6%</span> |
| GPU - LLM                | <span style="color: #1fea00;">+8.7%</span> | <span style="color: #1fea00;">+2.0%</span> | <span style="color: #1fea00;">+10.7%</span> |
\* **for example, in case of Passmark we have a 19% performance increase when going from 55W to 85W budget and additional 11.8% increase relative to the original 55W performance when going from 85W to 120W, or a 30.8% in total**

Or represented on the chart:

![](./Power_Modes_and_Performance/PowerModesvsPerformance.png)

A classic situation of diminishing returns, where **85W mode seems to be the sweet spot** and a good compromise between performance gain and power consumption.

The 55W mode is suitable if you don't fully utilize your system resources (especially when you don't leverage all cores) or aren't concerned about performance loss. With that said, **55W limit is absolutely enough for the APU in general**.

The 120W mode generally doesn't make much sense unless you aim to extract the absolute maximum from your system, with one exception - certain games respond more positively to this increase. My theory is that CPU-heavy games might slightly starve the GPU, so increasing the overall power budget alleviates this issue. Additionally, if you're just shy of reaching 60 fps at 1080p (a reasonable target for this system), this extra power might provide the necessary boost.

For LLMs, memory bandwidth (which APU's power limit doesn't affect) appears to play a more significant role than raw computing power, so again, exceeding 85W offers diminishing benefits.

In summary:
 - 55W for light loads (background services, office work, multimedia)
 - 120W for intensive gaming sessions
 - 85W for mixed workloads and everything else

There is also a way to control power limits more gradually, [read more here](./Sixunited_AXB35/Power_Mode_and_Fan_Control.md#fine-tuning-power-limits).
