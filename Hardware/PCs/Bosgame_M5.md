# Bosgame M5

![Bosgame M5](./bosgame-m5.jpg)

[[OFFICIAL PRODUCT PAGE](https://www.bosgame.com/products/bosgame-m5-ai-mini-desktop-ryzen-ai-max-395-96gb-128gb-2tb)]  - [Official trailer video](https://www.youtube.com/watch?v=mS-xdB4Vb4U)

Yet another mini PC based on the [[Sixunited's AXB35 board|Hardware/Boards/Sixunited_AXB35]] available with 128GB or 96GB RAM. Also known as [Peladn YO1](https://peladn.com/products/yo1-395-mini-pc) and [X+ Rival](https://x-plus.store/products/xrival).

Availability: since July 2025.

Price: $2799 / 2343€ for the 128GB version, $2099 / 1791€ for the 96GB RAM version. In the EU, VAT is included in the price. The PC comes with Windows 11 Pro preinstalled on the 2TB SSD.

As of July 2026, EU orders are shipped from Germany, UK orders are shipped from the UK and US orders are shipped from the US. All other orders are shipped from China.

> [!WARNING]
> Multiple users reported the following problems:  
> - Loose screw(s) inside the case - shake your PC before first use, remove the screw(s) if you hear any rattling
> - Incorrectly seated power button - try wiggling it around or disassembling the PC and re-seating it
> - Rear fan may produce clicking noises - replacement is difficult due to custom design, some people managed to fix the issue by straightening and strengthening the fan frame


### Reviews

* 2025-08-16: [Notebookcheck](https://www.notebookcheck.net/Best-mini-PC-of-the-year-AMD-Strix-Halo-128-GB-RAM-Radeon-RX-8060S-reviewed-in-the-Bosgame-M5.1087793.0.html) 
* 2025-08-20: [Guru3D](https://www.guru3d.com/review/review-bosgame-m5-ai-mini-desktop-ryzen-ai-395/) 
* 2025-08-24: [TechRadar](https://www.techradar.com/computing/bosgame-m5-ai-mini-pc-review) 
* 2025-08-24: [NHub](http://nhub.news/2025/08/i-tested-out-the-bosgame-m5-ai-and-it-takes-your-expectations-about-what-a-mini-pc-can-do-and-detonates-them-just-for-fun/) 
* Video reviews on YouTube: 2025-07-25 by [Paul Gallant](https://www.youtube.com/watch?v=IL4hSjfSlVM), 2025-10-10 by [Tek Syndicate](https://www.youtube.com/watch?v=rVbOWbgTar0), 2025-10-24 by [TechCircuit](https://www.youtube.com/watch?v=rDyZsqDmQbQ), 2025-12-23 by [The Phawx](https://www.youtube.com/watch?v=r--8jx6gvGM)


### Hardware

Disassembly video: https://www.youtube.com/watch?v=iJYixZ0G7YA

**RAM** (reported variants):
- Samsung K3KLALA0EM-MGCV RAM (9600Mhz) (October 2025)
- Micron MT62F4G32D8DV-023 WT memory (8533Mhz) (December 2025)

Note that the APU is limited to 8000Mhz at the moment so there shouldn't be any noticable difference.

**SSD** (reported variants):
- KINGSTON OM8TAP42048K1-A00 M.2 2TB NVMe PCIe 4.0 x4 SSD with 640 TBW ([Datasheet](https://www.mouser.com/catalog/specsheets/Kingston_03-04-2025_OM8TAP4xxxxK1-A00_%20Product%20Specification_version_v1.0_10252024.pdf))
- Yangtze PC41Q-2TB-B M.2 PCIe Gen4x4 NVMe (February 2026) ([Product Details](https://www.ymtc.com/en/products/35.html?cat=37))

**Wifi/Bluetooth**: It uses the MediaTek MT7925 combo wireless module - like many other Strix Halo systems - to provide Wi-Fi 7 and Bluetooth 5.4.

## Linux on the Bosgame M5

You can use the `ec-su_axb35` Linux kernel module that's linked at [[Power Mode and Fan Control|/Guides/Sixunited_AXB35/Power_Mode_and_Fan_Control]].

Here are some hopefully useful outputs created on Bosgame M5 with Linux kernel 6.18.3:

>| # lspci
>| ```00:00.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Root Complex (rev 02)
>| 00:00.2 IOMMU: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo IOMMU (rev 02)
>| 00:01.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>| 00:01.1 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo PCIe USB4 Bridge (rev 02)
>| 00:01.2 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo PCIe USB4 Bridge (rev 02)
>| 00:02.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>| 00:02.1 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo GPP Bridge (rev 02)
>| 00:02.2 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo GPP Bridge (rev 02)
>| 00:03.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>| 00:03.1 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo GPP Bridge
>| 00:08.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>| 00:08.1 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Internal GPP Bridge to Bus [C:A]
>| 00:08.2 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Internal GPP Bridge to Bus [C:A]
>| 00:08.3 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Internal GPP Bridge to Bus [C:A]
>| 00:14.0 SMBus: Advanced Micro Devices, Inc. [AMD] FCH SMBus Controller (rev 71)
>| 00:14.3 ISA bridge: Advanced Micro Devices, Inc. [AMD] FCH LPC Bridge (rev 51)
>| 00:18.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 0
>| 00:18.1 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 1
>| 00:18.2 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 2
>| 00:18.3 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 3
>| 00:18.4 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 4
>| 00:18.5 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 5
>| 00:18.6 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 6
>| 00:18.7 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 7
>| c1:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller (rev 05)
>| c2:00.0 SD Host controller: Genesys Logic, Inc GL9755 SD Host Controller (rev 01)
>| c3:00.0 Non-Volatile memory controller: Kingston Technology Company, Inc. OM8TAP4 PCIe 4 NVMe SSD (QLC) (DRAM-less)
>| c4:00.0 Display controller: Advanced Micro Devices, Inc. [AMD/ATI] Strix Halo [Radeon Graphics / Radeon 8050S Graphics / Radeon 8060S Graphics] (rev c1)
>| c4:00.1 Audio device: Advanced Micro Devices, Inc. [AMD/ATI] Radeon High Definition Audio Controller
>| c4:00.2 Encryption controller: Advanced Micro Devices, Inc. [AMD] Strix/Krackan/Strix Halo CCP/ASP
>| c4:00.4 USB controller: Advanced `Micro` Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>| c4:00.6 Audio device: Advanced Micro Devices, Inc. [AMD] Ryzen HD Audio Controller
>| c5:00.0 Non-Essential Instrumentation [1300]: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo PCIe Dummy Function
>| c5:00.1 Signal processing controller: Advanced Micro Devices, Inc. [AMD] Strix/Krackan/Strix Halo Neural Processing Unit (rev 11)
>| c6:00.0 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>| c6:00.3 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>| c6:00.4 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>| c6:00.5 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB4 Host Router
>| c6:00.6 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB4 Host Router
>| ```


>| # lspci -tv
>| ```-[0000:00]-+-00.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Root Complex
>|            +-00.2  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo IOMMU
>|            +-01.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>|            +-01.1-[01-60]--
>|            +-01.2-[61-c0]--
>|            +-02.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>|            +-02.1-[c1]----00.0  Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller
>|            +-02.2-[c2]----00.0  Genesys Logic, Inc GL9755 SD Host Controller
>|            +-03.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>|            +-03.1-[c3]----00.0  Kingston Technology Company, Inc. OM8TAP4 PCIe 4 NVMe SSD (QLC) (DRAM-less)
>|            +-08.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>|            +-08.1-[c4]--+-00.0  Advanced Micro Devices, Inc. [AMD/ATI] Strix Halo [Radeon Graphics / Radeon 8050S Graphics / Radeon 8060S Graphics]
>|            |            +-00.1  Advanced Micro Devices, Inc. [AMD/ATI] Radeon High Definition Audio Controller
>|            |            +-00.2  Advanced Micro Devices, Inc. [AMD] Strix/Krackan/Strix Halo CCP/ASP
>|            |            +-00.4  Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>|            |            \-00.6  Advanced Micro Devices, Inc. [AMD] Ryzen HD Audio Controller
>|            +-08.2-[c5]--+-00.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo PCIe Dummy Function
>|            |            \-00.1  Advanced Micro Devices, Inc. [AMD] Strix/Krackan/Strix Halo Neural Processing Unit
>|            +-08.3-[c6]--+-00.0  Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>|            |            +-00.3  Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>|            |            +-00.4  Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>|            |            +-00.5  Advanced Micro Devices, Inc. [AMD] Strix Halo USB4 Host Router
>|            |            \-00.6  Advanced Micro Devices, Inc. [AMD] Strix Halo USB4 Host Router
>|            +-14.0  Advanced Micro Devices, Inc. [AMD] FCH SMBus Controller
>|            +-14.3  Advanced Micro Devices, Inc. [AMD] FCH LPC Bridge
>|            +-18.0  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 0
>|            +-18.1  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 1
>|            +-18.2  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 2
>|            +-18.3  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 3
>|            +-18.4  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 4
>|            +-18.5  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 5
>|            +-18.6  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 6
>|            \-18.7  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 7
>| ```


>| # lsusb
>| ```Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
>| Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
>| Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
>| Bus 003 Device 002: ID 0e8d:0717 MediaTek Inc. Wireless_Device
>| Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
>| Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
>| Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
>| Bus 007 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
>| Bus 008 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
>| ```

>| # lshw -sanitize
>| ```computer
>|     description: Mini PC
>|     product: BeyondMax Series (0005)
>|     vendor: Bosgame
>|     version: Version 1.0
>|     serial: [REMOVED]
>|     width: 64 bits
>|     capabilities: smbios-3.7.0 dmi-3.7.0 smp vsyscall32
>|     configuration: boot=normal chassis=mini family=AXB35-02 sku=0005 uuid=[REMOVED]
>|   *-core
>|        description: Motherboard
>|        product: AXB35-02
>|        vendor: Bosgame
>|        physical id: 0
>|        version: Version 1.0
>|        serial: [REMOVED]
>|        slot: Default string
>|      *-firmware
>|           description: BIOS
>|           vendor: American Megatrends International, LLC.
>|           physical id: 0
>|           version: 1.07
>|           date: 09/12/2025
>|           size: 64KiB
>|           capacity: 32MiB
>|           capabilities: pci upgrade shadowing cdboot bootselect socketedrom edd acpi biosbootspecification uefi
>|      *-cache:0
>|           description: L1 cache
>|           physical id: b
>|           slot: L1 - Cache
>|           size: 1280KiB
>|           capacity: 1280KiB
>|           clock: 1GHz (1.0ns)
>|           capabilities: pipeline-burst internal write-back unified
>|           configuration: level=1
>|      *-cache:1
>|           description: L2 cache
>|           physical id: c
>|           slot: L2 - Cache
>|           size: 16MiB
>|           capacity: 16MiB
>|           clock: 1GHz (1.0ns)
>|           capabilities: pipeline-burst internal write-back unified
>|           configuration: level=2
>|      *-cache:2
>|           description: L3 cache
>|           physical id: d
>|           slot: L3 - Cache
>|           size: 64MiB
>|           capacity: 64MiB
>|           clock: 1GHz (1.0ns)
>|           capabilities: pipeline-burst internal write-back unified
>|           configuration: level=3
>|      *-cpu
>|           description: CPU
>|           product: AMD RYZEN AI MAX+ 395 w/ Radeon 8060S
>|           vendor: Advanced Micro Devices [AMD]
>|           physical id: e
>|           bus info: cpu@0
>|           version: 26.112.0
>|           serial: [REMOVED]
>|           slot: FP11LPDDR5x
>|           size: 2GHz
>|           capacity: 5187MHz
>|           width: 64 bits
>|           clock: 100MHz
>|           capabilities: lm fpu fpu_exception wp vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp x86-64 constant_tsc rep_good amd_lbr_v2 nopl xtopology nonstop_tsc cpuid extd_apicid aperfmperf rapl pni pclmulqdq monitor ssse3 fma cx16 sse4_1 sse4_2 movbe popcnt aes xsave avx f16c rdrand lahf_lm cmp_legacy svm extapic cr8_legacy abm sse4a misalignsse 3dnowprefetch osvw ibs skinit wdt tce topoext perfctr_core perfctr_nb bpext perfctr_llc mwaitx cpuid_fault cpb cat_l3 cdp_l3 hw_pstate ssbd mba perfmon_v2 ibrs ibpb stibp ibrs_enhanced vmmcall fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid cqm rdt_a avx512f avx512dq adx smap avx512ifma clflushopt clwb avx512cd sha_ni avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves cqm_llc cqm_occup_llc cqm_mbm_total cqm_mbm_local user_shstk avx_vnni avx512_bf16 clzero irperf xsaveerptr rdpru wbnoinvd cppc arat npt lbrv svm_lock nrip_save tsc_scale vmcb_clean flushbyasid decodeassists pausefilter pfthreshold avic v_vmsave_vmload vgif x2avic v_spec_ctrl vnmi avx512vbmi umip pku ospke avx512_vbmi2 gfni vaes vpclmulqdq avx512_vnni avx512_bitalg avx512_vpopcntdq rdpid bus_lock_detect movdiri movdir64b overflow_recov succor smca fsrm avx512_vp2intersect flush_l1d amd_lbr_pmc_freeze cpufreq
>|           configuration: cores=16 enabledcores=16 microcode=191889460 threads=32
>|      *-memory
>|           description: System Memory
>|           physical id: 11
>|           slot: System board or motherboard
>|           size: 128GiB
>|         *-bank:0
>|              description: Synchronous Unbuffered (Unregistered) 8532 MHz (0,1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 0
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 4237MHz (0.2ns)
>|         *-bank:1
>|              description: Synchronous Unbuffered (Unregistered) 8532 MHz (0,1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 1
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 4237MHz (0.2ns)
>|         *-bank:2
>|              description: Synchronous Unbuffered (Unregistered) 8532 MHz (0,1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 2
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 4237MHz (0.2ns)
>|         *-bank:3
>|              description: Synchronous Unbuffered (Unregistered) 8532 MHz (0,1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 3
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 4237MHz (0.2ns)
>|         *-bank:4
>|              description: Synchronous Unbuffered (Unregistered) 8532 MHz (0,1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 4
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 4237MHz (0.2ns)
>|         *-bank:5
>|              description: Synchronous Unbuffered (Unregistered) 8532 MHz (0,1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 5
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 4237MHz (0.2ns)
>|         *-bank:6
>|              description: Synchronous Unbuffered (Unregistered) 8532 MHz (0,1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 6
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 4237MHz (0.2ns)
>|         *-bank:7
>|              description: Synchronous Unbuffered (Unregistered) 8532 MHz (0,1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 7
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 4237MHz (0.2ns)
>|      *-pci:0
>|           description: Host bridge
>|           product: Strix/Strix Halo Root Complex
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 100
>|           bus info: pci@0000:00:00.0
>|           version: 02
>|           width: 32 bits
>|           clock: 33MHz
>|         *-generic UNCLAIMED
>|              description: IOMMU
>|              product: Strix/Strix Halo IOMMU
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 0.2
>|              bus info: pci@0000:00:00.2
>|              version: 02
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: msi ht bus_master cap_list
>|              configuration: latency=0
>|         *-pci:0
>|              description: PCI bridge
>|              product: Strix/Strix Halo PCIe USB4 Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 1.1
>|              bus info: pci@0000:00:01.1
>|              version: 02
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi ht normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:31 ioport:a000(size=16384) memory:c4000000-dbffffff ioport:7800000000(size=137438953472)
>|         *-pci:1
>|              description: PCI bridge
>|              product: Strix/Strix Halo PCIe USB4 Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 1.2
>|              bus info: pci@0000:00:01.2
>|              version: 02
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi ht normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:32 ioport:6000(size=16384) memory:ac000000-c3ffffff ioport:5800000000(size=137438953472)
>|         *-pci:2
>|              description: PCI bridge
>|              product: Strix/Strix Halo GPP Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 2.1
>|              bus info: pci@0000:00:02.1
>|              version: 02
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi ht normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:33 ioport:f000(size=4096) memory:dce00000-dcefffff
>|            *-network
>|                 description: Ethernet interface
>|                 product: RTL8125 2.5GbE Controller
>|                 vendor: Realtek Semiconductor Co., Ltd.
>|                 physical id: 0
>|                 bus info: pci@0000:c1:00.0
>|                 logical name: eno1
>|                 version: 05
>|                 serial: [REMOVED]
>|                 size: 1Gbit/s
>|                 capacity: 2500Mbit/s
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm msi pciexpress msix vpd bus_master cap_list ethernet physical tp mii 10bt 10bt-fd 100bt 100bt-fd 1000bt-fd 2500bt-fd autonegotiation
>|                 configuration: autonegotiation=on broadcast=yes driver=r8169 driverversion=6.18.3-200.fc43.x86_64 duplex=full firmware=rtl8125b-2_0.0.2 07/13/20 ip=[REMOVED] latency=0 link=yes multicast=yes port=twisted pair speed=1Gbit/s
>|                 resources: irq:25 ioport:f000(size=256) memory:dce00000-dce0ffff memory:dce10000-dce13fff
>|         *-pci:3
>|              description: PCI bridge
>|              product: Strix/Strix Halo GPP Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 2.2
>|              bus info: pci@0000:00:02.2
>|              version: 02
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi ht normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:34 memory:dcd00000-dcdfffff
>|            *-generic
>|                 description: MMC Host
>|                 product: GL9755 SD Host Controller
>|                 vendor: Genesys Logic, Inc
>|                 physical id: 0
>|                 bus info: pci@0000:c2:00.0
>|                 logical name: mmc0
>|                 version: 01
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pciexpress msi pm bus_master cap_list
>|                 configuration: driver=sdhci-pci latency=0
>|                 resources: irq:101 memory:dcd00000-dcd00fff
>|         *-pci:4
>|              description: PCI bridge
>|              product: Strix/Strix Halo GPP Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 3.1
>|              bus info: pci@0000:00:03.1
>|              version: 00
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi ht normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:35 memory:dcc00000-dccfffff
>|            *-nvme
>|                 description: NVMe device
>|                 product: KINGSTON OM8TAP42048K1-A00
>|                 vendor: Kingston Technology Company, Inc.
>|                 physical id: 0
>|                 bus info: pci@0000:c3:00.0
>|                 logical name: /dev/nvme0
>|                 version: P4ER3B31
>|                 serial: [REMOVED]
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: nvme pm msi pciexpress msix nvm_express bus_master cap_list
>|                 configuration: driver=nvme latency=0 nqn=nqn.2020-04.com.kingston:nvme:nvm-subsystem-sn-50026B73844BB661 state=live
>|                 resources: irq:100 memory:dcc00000-dcc03fff
>|               *-namespace:0
>|                    description: NVMe disk
>|                    physical id: 0
>|                    logical name: hwmon1
>|               *-namespace:1
>|                    description: NVMe disk
>|                    physical id: 2
>|                    logical name: /dev/ng0n1
>|               *-namespace:2
>|                    description: NVMe disk
>|                    physical id: 1
>|                    bus info: nvme@0:1
>|                    logical name: /dev/nvme0n1
>|                    size: 1907GiB (2048GB)
>|                    capabilities: gpt-1.00 partitioned partitioned:gpt
>|                    configuration: guid=[REMOVED] logicalsectorsize=512 sectorsize=512 wwid=eui.0026b73844bb6615
>|                  *-volume:0
>|                       description: Windows FAT volume
>|                       vendor: mkfs.fat
>|                       physical id: 1
>|                       bus info: nvme@0:1,1
>|                       logical name: /dev/nvme0n1p1
>|                       logical name: /boot/efi
>|                       version: FAT32
>|                       serial: [REMOVED]
>|                       size: 598MiB
>|                       capacity: 599MiB
>|                       capabilities: boot fat initialized
>|                       configuration: FATs=2 filesystem=fat mount.fstype=vfat mount.options=rw,relatime,fmask=0077,dmask=0077,codepage=437,iocharset=ascii,shortname=winnt,errors=remount-ro name=EFI System Partition state=mounted
>|                  *-volume:1
>|                       description: EXT4 volume
>|                       vendor: Linux
>|                       physical id: 2
>|                       bus info: nvme@0:1,2
>|                       logical name: /dev/nvme0n1p2
>|                       logical name: /boot
>|                       version: 1.0
>|                       serial: [REMOVED]
>|                       size: 2GiB
>|                       capabilities: journaled extended_attributes large_files huge_files dir_nlink recover 64bit extents ext4 ext2 initialized
>|                       configuration: created=2026-01-07 00:28:44 filesystem=ext4 lastmountpoint=/boot modified=2026-01-10 22:23:10 mount.fstype=ext4 mount.options=rw,seclabel,relatime mounted=2026-01-10 13:57:25 state=mounted
>|                  *-volume:2
>|                       description: EFI partition
>|                       physical id: 3
>|                       bus info: nvme@0:1,3
>|                       logical name: /dev/nvme0n1p3
>|                       logical name: /
>|                       logical name: /home
>|                       serial: [REMOVED]
>|                       capacity: 1905GiB
>|                       configuration: mount.fstype=btrfs mount.options=rw,seclabel,relatime,compress=zstd:1,ssd,discard=async,space_cache=v2,subvolid=257,subvol=/home state=mounted
>|         *-pci:5
>|              description: PCI bridge
>|              product: Strix/Strix Halo Internal GPP Bridge to Bus [C:A]
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 8.1
>|              bus info: pci@0000:00:08.1
>|              version: 00
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:36 ioport:e000(size=4096) memory:dc000000-dc5fffff ioport:9800000000(size=536870912)
>|            *-display
>|                 description: Display controller
>|                 product: Strix Halo [Radeon Graphics / Radeon 8050S Graphics / Radeon 8060S Graphics]
>|                 vendor: Advanced Micro Devices, Inc. [AMD/ATI]
>|                 physical id: 0
>|                 bus info: pci@0000:c4:00.0
>|                 version: c1
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list
>|                 configuration: driver=amdgpu latency=0
>|                 resources: iomemory:980-97f irq:135 memory:9800000000-981fffffff memory:dc000000-dc1fffff ioport:e000(size=256) memory:dc400000-dc4fffff
>|            *-multimedia:0
>|                 description: Audio device
>|                 product: Radeon High Definition Audio Controller
>|                 vendor: Advanced Micro Devices, Inc. [AMD/ATI]
>|                 physical id: 0.1
>|                 bus info: pci@0000:c4:00.1
>|                 logical name: card0
>|                 logical name: /dev/snd/controlC0
>|                 logical name: /dev/snd/hwC0D0
>|                 logical name: /dev/snd/pcmC0D3p
>|                 logical name: /dev/snd/pcmC0D7p
>|                 logical name: /dev/snd/pcmC0D8p
>|                 logical name: /dev/snd/pcmC0D9p
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi hda_compatible bus_master cap_list
>|                 configuration: driver=snd_hda_intel latency=0
>|                 resources: irq:139 memory:dc508000-dc50bfff
>|               *-input:0
>|                    product: HD-Audio Generic HDMI/DP,pcm=3
>|                    physical id: 0
>|                    logical name: input5
>|                    logical name: /dev/input/event5
>|               *-input:1
>|                    product: HD-Audio Generic HDMI/DP,pcm=7
>|                    physical id: 1
>|                    logical name: input6
>|                    logical name: /dev/input/event6
>|               *-input:2
>|                    product: HD-Audio Generic HDMI/DP,pcm=8
>|                    physical id: 2
>|                    logical name: input7
>|                    logical name: /dev/input/event7
>|               *-input:3
>|                    product: HD-Audio Generic HDMI/DP,pcm=9
>|                    physical id: 3
>|                    logical name: input8
>|                    logical name: /dev/input/event8
>|            *-generic
>|                 description: Encryption controller
>|                 product: Strix/Krackan/Strix Halo CCP/ASP
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.2
>|                 bus info: pci@0000:c4:00.2
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list
>|                 configuration: driver=ccp latency=0
>|                 resources: irq:46 memory:dc300000-dc3fffff memory:dc50c000-dc50dfff
>|            *-usb
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.4
>|                 bus info: pci@0000:c4:00.4
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:25 memory:dc200000-dc2fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.18.3-200.fc43.x86_64 xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@1
>|                    logical name: usb1
>|                    version: 6.18
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.18.3-200.fc43.x86_64 xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@2
>|                    logical name: usb2
>|                    version: 6.18
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|            *-multimedia:1
>|                 description: Audio device
>|                 product: Ryzen HD Audio Controller
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.6
>|                 bus info: pci@0000:c4:00.6
>|                 logical name: card1
>|                 logical name: /dev/snd/controlC1
>|                 logical name: /dev/snd/hwC1D0
>|                 logical name: /dev/snd/pcmC1D0c
>|                 logical name: /dev/snd/pcmC1D0p
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi hda_compatible bus_master cap_list
>|                 configuration: driver=snd_hda_intel latency=0
>|                 resources: irq:140 memory:dc500000-dc507fff
>|               *-input:0
>|                    product: HD-Audio Generic Front Mic
>|                    physical id: 0
>|                    logical name: input10
>|                    logical name: /dev/input/event10
>|               *-input:1
>|                    product: HD-Audio Generic Front Line Out
>|                    physical id: 1
>|                    logical name: input11
>|                    logical name: /dev/input/event11
>|               *-input:2
>|                    product: HD-Audio Generic Headphone
>|                    physical id: 2
>|                    logical name: input12
>|                    logical name: /dev/input/event12
>|               *-input:3
>|                    product: HD-Audio Generic Rear Mic
>|                    physical id: 3
>|                    logical name: input9
>|                    logical name: /dev/input/event9
>|         *-pci:6
>|              description: PCI bridge
>|              product: Strix/Strix Halo Internal GPP Bridge to Bus [C:A]
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 8.2
>|              bus info: pci@0000:00:08.2
>|              version: 00
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:37 memory:dca00000-dcbfffff ioport:9820000000(size=1048576)
>|            *-generic:0 UNCLAIMED
>|                 description: Non-Essential Instrumentation
>|                 product: Strix/Strix Halo PCIe Dummy Function
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0
>|                 bus info: pci@0000:c5:00.0
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi cap_list
>|                 configuration: latency=0
>|            *-generic:1
>|                 description: Signal processing controller
>|                 product: Strix/Krackan/Strix Halo Neural Processing Unit
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.1
>|                 bus info: pci@0000:c5:00.1
>|                 version: 11
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list
>|                 configuration: driver=amdxdna latency=0
>|                 resources: iomemory:980-97f irq:66 memory:dca00000-dcafffff memory:dcb00000-dcb01fff memory:9820000000-982007ffff memory:dcb03000-dcb03fff memory:dcb02000-dcb02fff
>|         *-pci:7
>|              description: PCI bridge
>|              product: Strix/Strix Halo Internal GPP Bridge to Bus [C:A]
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 8.3
>|              bus info: pci@0000:00:08.3
>|              version: 00
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:38 memory:dc600000-dc9fffff
>|            *-usb:0
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0
>|                 bus info: pci@0000:c6:00.0
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:40 memory:dc800000-dc8fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.18.3-200.fc43.x86_64 xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@3
>|                    logical name: usb3
>|                    version: 6.18
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=5 speed=480Mbit/s
>|                  *-usb
>|                       description: Bluetooth wireless interface
>|                       product: Wireless_Device
>|                       vendor: MediaTek Inc.
>|                       physical id: 5
>|                       bus info: usb@3:5
>|                       version: 1.00
>|                       serial: [REMOVED]
>|                       capabilities: usb-2.10 bluetooth
>|                       configuration: driver=btusb maxpower=100mA speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.18.3-200.fc43.x86_64 xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@4
>|                    logical name: usb4
>|                    version: 6.18
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=2 speed=10000Mbit/s
>|            *-usb:1
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.3
>|                 bus info: pci@0000:c6:00.3
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:42 memory:dc700000-dc7fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.18.3-200.fc43.x86_64 xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@5
>|                    logical name: usb5
>|                    version: 6.18
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.18.3-200.fc43.x86_64 xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@6
>|                    logical name: usb6
>|                    version: 6.18
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|            *-usb:2
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.4
>|                 bus info: pci@0000:c6:00.4
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:44 memory:dc600000-dc6fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.18.3-200.fc43.x86_64 xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@7
>|                    logical name: usb7
>|                    version: 6.18
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.18.3-200.fc43.x86_64 xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@8
>|                    logical name: usb8
>|                    version: 6.18
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|            *-usb:3
>|                 description: USB controller
>|                 product: Strix Halo USB4 Host Router
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.5
>|                 bus info: pci@0000:c6:00.5
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix usb4_host_interface bus_master cap_list
>|                 configuration: driver=thunderbolt latency=0
>|                 resources: irq:49 memory:dc980000-dc9fffff
>|            *-usb:4
>|                 description: USB controller
>|                 product: Strix Halo USB4 Host Router
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.6
>|                 bus info: pci@0000:c6:00.6
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix usb4_host_interface bus_master cap_list
>|                 configuration: driver=thunderbolt latency=0
>|                 resources: irq:40 memory:dc900000-dc97ffff
>|         *-serial
>|              description: SMBus
>|              product: FCH SMBus Controller
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 14
>|              bus info: pci@0000:00:14.0
>|              version: 71
>|              width: 32 bits
>|              clock: 66MHz
>|              configuration: driver=piix4_smbus latency=0
>|              resources: irq:0
>|         *-isa
>|              description: ISA bridge
>|              product: FCH LPC Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 14.3
>|              bus info: pci@0000:00:14.3
>|              version: 51
>|              width: 32 bits
>|              clock: 66MHz
>|              capabilities: isa bus_master
>|              configuration: latency=0
>|            *-pnp00:00
>|                 product: PnP device PNP0b00
>|                 physical id: 0
>|                 capabilities: pnp
>|                 configuration: driver=rtc_cmos
>|            *-pnp00:01
>|                 product: PnP device PNP0c02
>|                 physical id: 1
>|                 capabilities: pnp
>|                 configuration: driver=system
>|            *-pnp00:02
>|                 product: PnP device PNP0c02
>|                 physical id: 2
>|                 capabilities: pnp
>|                 configuration: driver=system
>|      *-pci:1
>|           description: Host bridge
>|           product: Strix/Strix Halo Dummy Host Bridge
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 101
>|           bus info: pci@0000:00:01.0
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:2
>|           description: Host bridge
>|           product: Strix/Strix Halo Dummy Host Bridge
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 102
>|           bus info: pci@0000:00:02.0
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:3
>|           description: Host bridge
>|           product: Strix/Strix Halo Dummy Host Bridge
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 103
>|           bus info: pci@0000:00:03.0
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:4
>|           description: Host bridge
>|           product: Strix/Strix Halo Dummy Host Bridge
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 104
>|           bus info: pci@0000:00:08.0
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:5
>|           description: Host bridge
>|           product: Strix Halo Data Fabric; Function 0
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 105
>|           bus info: pci@0000:00:18.0
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:6
>|           description: Host bridge
>|           product: Strix Halo Data Fabric; Function 1
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 106
>|           bus info: pci@0000:00:18.1
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:7
>|           description: Host bridge
>|           product: Strix Halo Data Fabric; Function 2
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 107
>|           bus info: pci@0000:00:18.2
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:8
>|           description: Host bridge
>|           product: Strix Halo Data Fabric; Function 3
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 108
>|           bus info: pci@0000:00:18.3
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|           configuration: driver=k10temp
>|           resources: irq:0
>|      *-pci:9
>|           description: Host bridge
>|           product: Strix Halo Data Fabric; Function 4
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 109
>|           bus info: pci@0000:00:18.4
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:10
>|           description: Host bridge
>|           product: Strix Halo Data Fabric; Function 5
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 10a
>|           bus info: pci@0000:00:18.5
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:11
>|           description: Host bridge
>|           product: Strix Halo Data Fabric; Function 6
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 10b
>|           bus info: pci@0000:00:18.6
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|      *-pci:12
>|           description: Host bridge
>|           product: Strix Halo Data Fabric; Function 7
>|           vendor: Advanced Micro Devices, Inc. [AMD]
>|           physical id: 10c
>|           bus info: pci@0000:00:18.7
>|           version: 00
>|           width: 32 bits
>|           clock: 33MHz
>|   *-input:0
>|        product: Power Button
>|        physical id: 1
>|        logical name: input0
>|        logical name: /dev/input/event0
>|        capabilities: platform
>|   *-input:1
>|        product: Sleep Button
>|        physical id: 2
>|        logical name: input1
>|        logical name: /dev/input/event1
>|        capabilities: platform
>|   *-input:2
>|        product: AT Raw Set 2 keyboard
>|        physical id: 3
>|        logical name: input2
>|        logical name: /dev/input/event2
>|        logical name: input2::capslock
>|        logical name: input2::numlock
>|        logical name: input2::scrolllock
>|        capabilities: i8042
>|   *-input:3
>|        product: Video Bus
>|        physical id: 4
>|        logical name: input3
>|        logical name: /dev/input/event3
>|        capabilities: platform
>|   *-input:4
>|        product: PC Speaker
>|        physical id: 5
>|        logical name: input4
>|        logical name: /dev/input/event4
>|        capabilities: isa
>|   *-network:0
>|        description: Ethernet interface
>|        physical id: 6
>|        logical name: thunderbolt0
>|        serial: [REMOVED]
>|        capabilities: ethernet physical
>|        configuration: broadcast=yes driver=thunderbolt-net driverversion=6.18.3-200.fc43.x86_64 ip=[REMOVED] multicast=yes
>|   *-network:1
>|        description: Ethernet interface
>|        physical id: 7
>|        logical name: thunderbolt1
>|        serial: [REMOVED]
>|        capabilities: ethernet physical
>|        configuration: broadcast=yes driver=thunderbolt-net driverversion=6.18.3-200.fc43.x86_64 ip=[REMOVED] multicast=yes
>| ```

### Relevant Pages
 - [[Hardware/Boards/Sixunited_AXB35]]
 - [[Hardware/Boards/Sixunited_AXB35/Firmware]]
 - [[Guides/Sixunited_AXB35]]
