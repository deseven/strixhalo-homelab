# Beelink GTR9 Pro

![Beelink GTR9 Pro](./Beelink_GTR9_Pro/beelink_gtr9.jpg)

[[OFFICIAL PRODUCT PAGE](https://www.bee-link.com/products/beelink-gtr9-pro-amd-ryzen-ai-max-395)]

Something interesting with unique board, cooling, 2x10G ethernet, integrated PSU and case in Mac Studio style.

Availability: available since September 2025.

> [!WARNING]
>
> Version 1 of the board has **MAJOR** stability issues with no possible software fix. Read more [here](https://craigwilson.blog/post/2025/2025-09-25-beelink395bsod/) and [here](https://bbs.bee-link.com/d/7762-gtr-9-pro-ethernet-malfunction-under-load).
>
> The issue appears to be resolved in board v2.2, which replaces the faulty Intel NICs with Realtek ones. When purchasing a PC, there is currently no obvious way to determine which board version it contains. Confirm with the seller what board version the PC has or which NICs it uses.
>
> Beelink officially offers replacements for v1 boards or complete PCs. A guide for replacing a v1 board with v2.2 is available [here](https://tetramatrix.github.io/startmenu/gtr9pro/).

### Linux on the Beelink GTR9 Pro

>| #lspci
>| ```00:00.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Root Complex (rev 02)
>| 00:00.2 IOMMU: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo IOMMU (rev 02)
>| 00:01.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>| 00:01.1 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo PCIe USB4 Bridge (rev 02)
>| 00:01.2 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo PCIe USB4 Bridge (rev 02)
>| 00:02.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>| 00:02.1 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo GPP Bridge (rev 02)
>| 00:02.2 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo GPP Bridge (rev 02)
>| 00:02.5 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo GPP Bridge (rev 02)
>| 00:03.0 Host bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>| 00:03.2 PCI bridge: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo GPP Bridge
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
>| c1:00.0 Network controller: MEDIATEK Corp. MT7925 802.11be 160MHz 2x2 PCIe Wireless Network Adapter [Filogic 360]
>| c2:00.0 SD Host controller: O2 Micro, Inc. Device 9863 (rev 01)
>| c3:00.0 Non-Volatile memory controller: Micron/Crucial Technology P310 NVMe PCIe SSD (DRAM-less) (rev 01)
>| c4:00.0 Ethernet controller: Intel Corporation Ethernet Controller E610 10GBASE T
>| c4:00.1 Ethernet controller: Intel Corporation Ethernet Controller E610 10GBASE T
>| c6:00.0 Display controller: Advanced Micro Devices, Inc. [AMD/ATI] Strix Halo [Radeon Graphics / Radeon 8050S Graphics / Radeon 8060S Graphics] (rev c1)
>| c6:00.1 Audio device: Advanced Micro Devices, Inc. [AMD/ATI] Radeon High Definition Audio Controller
>| c6:00.2 Encryption controller: Advanced Micro Devices, Inc. [AMD] Strix/Krackan/Strix Halo CCP/ASP
>| c6:00.4 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>| c6:00.5 Multimedia controller: Advanced Micro Devices, Inc. [AMD] Audio Coprocessor (rev 70)
>| c6:00.6 Audio device: Advanced Micro Devices, Inc. [AMD] Ryzen HD Audio Controller
>| c7:00.0 Non-Essential Instrumentation [1300]: Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo PCIe Dummy Function
>| c7:00.1 Signal processing controller: Advanced Micro Devices, Inc. [AMD] Strix/Krackan/Strix Halo Neural Processing Unit (rev 11)
>| c8:00.0 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>| c8:00.3 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>| c8:00.4 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>| c8:00.5 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB4 Host Router
>| c8:00.6 USB controller: Advanced Micro Devices, Inc. [AMD] Strix Halo USB4 Host Router
>| ```

>| # lspci -t
>| ```-[0000:00]-+-00.0
>|            +-00.2
>|            +-01.0
>|            +-01.1-[01-60]--
>|            +-01.2-[61-c0]--
>|            +-02.0
>|            +-02.1-[c1]----00.0
>|            +-02.2-[c2]----00.0
>|            +-02.5-[c3]----00.0
>|            +-03.0
>|            +-03.2-[c4-c5]--+-00.0
>|            |               \-00.1
>|            +-08.0
>|            +-08.1-[c6]--+-00.0
>|            |            +-00.1
>|            |            +-00.2
>|            |            +-00.4
>|            |            +-00.5
>|            |            \-00.6
>|            +-08.2-[c7]--+-00.0
>|            |            \-00.1
>|            +-08.3-[c8]--+-00.0
>|            |            +-00.3
>|            |            +-00.4
>|            |            +-00.5
>|            |            \-00.6
>|            +-14.0
>|            +-14.3
>|            +-18.0
>|            +-18.1
>|            +-18.2
>|            +-18.3
>|            +-18.4
>|            +-18.5
>|            +-18.6
>|            \-18.7
>| ```

>| # lsusb
>| ```Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
>| Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
>| Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
>| Bus 003 Device 002: ID 38eb:0003 Glinet Glinet Composite Device
>| Bus 003 Device 003: ID 1c7a:0577 LighTuning Technology Inc. Fingerprint Sensor
>| Bus 003 Device 004: ID 1d6b:a4a7 Linux Foundation POROSVOC
>| Bus 003 Device 005: ID 13d3:3604 IMC Networks Wireless_Device
>| Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
>| Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
>| Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
>| Bus 007 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
>| Bus 008 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
>| ```

>| # sudo lshw -sanitize
>| ```computer                    
>|     description: Mini PC
>|     product: GTR Pro (75)
>|     vendor: AZW
>|     version: Default string
>|     serial: [REMOVED]
>|     width: 64 bits
>|     capabilities: smbios-3.7.0 dmi-3.7.0 smp vsyscall32
>|     configuration: boot=normal chassis=mini family=GTR Pro sku=75 uuid=[REMOVED]
>|   *-core
>|        description: Motherboard
>|        product: GTR Pro
>|        vendor: AZW
>|        physical id: 0
>|        version: Default string
>|        serial: [REMOVED]
>|        slot: Default string
>|      *-firmware
>|           description: BIOS
>|           vendor: American Megatrends International, LLC.
>|           physical id: 0
>|           version: GTRP110
>|           date: 12/18/2025
>|           size: 64KiB
>|           capacity: 32MiB
>|           capabilities: pci upgrade shadowing cdboot bootselect socketedrom edd acpi biosbootspecification uefi
>|      *-cache:0
>|           description: L1 cache
>|           physical id: 19
>|           slot: L1 - Cache
>|           size: 1280KiB
>|           capacity: 1280KiB
>|           clock: 1GHz (1.0ns)
>|           capabilities: pipeline-burst internal write-back unified
>|           configuration: level=1
>|      *-cache:1
>|           description: L2 cache
>|           physical id: 1a
>|           slot: L2 - Cache
>|           size: 16MiB
>|           capacity: 16MiB
>|           clock: 1GHz (1.0ns)
>|           capabilities: pipeline-burst internal write-back unified
>|           configuration: level=2
>|      *-cache:2
>|           description: L3 cache
>|           physical id: 1b
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
>|           physical id: 1c
>|           bus info: cpu@0
>|           version: 26.112.0
>|           serial: [REMOVED]
>|           slot: FP11LPDDR5x
>|           size: 2GHz
>|           capacity: 5187MHz
>|           width: 64 bits
>|           clock: 100MHz
>|           capabilities: lm fpu fpu_exception wp vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp x86-64 constant_tsc rep_good amd_lbr_v2 nopl xtopology nonstop_tsc cpuid extd_apicid aperfmperf rapl pni pclmulqdq monitor ssse3 fma cx16 sse4_1 sse4_2 movbe popcnt aes xsave avx f16c rdrand lahf_lm cmp_legacy svm extapic cr8_legacy abm sse4a misalignsse 3dnowprefetch osvw ibs skinit wdt tce topoext perfctr_core perfctr_nb bpext perfctr_llc mwaitx cpuid_fault cpb cat_l3 cdp_l3 hw_pstate ssbd mba perfmon_v2 ibrs ibpb stibp ibrs_enhanced vmmcall fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid cqm rdt_a avx512f avx512dq adx smap avx512ifma clflushopt clwb avx512cd sha_ni avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves cqm_llc cqm_occup_llc cqm_mbm_total cqm_mbm_local user_shstk avx_vnni avx512_bf16 clzero irperf xsaveerptr rdpru wbnoinvd cppc arat npt lbrv svm_lock nrip_save tsc_scale vmcb_clean flushbyasid decodeassists pausefilter pfthreshold avic v_vmsave_vmload vgif x2avic v_spec_ctrl vnmi avx512vbmi umip pku ospke avx512_vbmi2 gfni vaes vpclmulqdq avx512_vnni avx512_bitalg avx512_vpopcntdq rdpid bus_lock_detect movdiri movdir64b overflow_recov succor smca fsrm avx512_vp2intersect flush_l1d amd_lbr_pmc_freeze cpufreq
>|           configuration: cores=16 enabledcores=16 microcode=191889438 threads=32
>|      *-memory
>|           description: System Memory
>|           physical id: 1f
>|           slot: System board or motherboard
>|           size: 128GiB
>|         *-bank:0
>|              description: Synchronous Unbuffered (Unregistered) 8000 MHz (0.1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 0
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 3705MHz (0.3ns)
>|         *-bank:1
>|              description: Synchronous Unbuffered (Unregistered) 8000 MHz (0.1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 1
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 3705MHz (0.3ns)
>|         *-bank:2
>|              description: Synchronous Unbuffered (Unregistered) 8000 MHz (0.1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 2
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 3705MHz (0.3ns)
>|         *-bank:3
>|              description: Synchronous Unbuffered (Unregistered) 8000 MHz (0.1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 3
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 3705MHz (0.3ns)
>|         *-bank:4
>|              description: Synchronous Unbuffered (Unregistered) 8000 MHz (0.1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 4
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 3705MHz (0.3ns)
>|         *-bank:5
>|              description: Synchronous Unbuffered (Unregistered) 8000 MHz (0.1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 5
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 3705MHz (0.3ns)
>|         *-bank:6
>|              description: Synchronous Unbuffered (Unregistered) 8000 MHz (0.1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 6
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 3705MHz (0.3ns)
>|         *-bank:7
>|              description: Synchronous Unbuffered (Unregistered) 8000 MHz (0.1 ns)
>|              product: MT62F4G32D8DV-023 WT
>|              vendor: Micron Technology
>|              physical id: 7
>|              serial: [REMOVED]
>|              slot: DIMM 0
>|              size: 16GiB
>|              width: 32 bits
>|              clock: 3705MHz (0.3ns)
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
>|              resources: irq:39 ioport:b000(size=16384) memory:bc000000-d3ffffff ioport:7800000000(size=137438953472)
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
>|              resources: irq:40 ioport:7000(size=16384) memory:a4000000-bbffffff ioport:5800000000(size=137438953472)
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
>|              resources: irq:41 memory:d4000000-d42fffff
>|            *-network
>|                 description: Ethernet interface
>|                 product: MT7925 802.11be 160MHz 2x2 PCIe Wireless Network Adapter [Filogic 360]
>|                 vendor: MEDIATEK Corp.
>|                 physical id: 0
>|                 bus info: pci@0000:c1:00.0
>|                 logical name: wlan0
>|                 version: 00
>|                 serial: [REMOVED]
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pciexpress msi pm bus_master cap_list ethernet physical
>|                 configuration: broadcast=yes driver=mt7925e driverversion=6.19.0-0.rc5.436.vanilla.fc44.x firmware=____000000-20260106153120 ip=[REMOVED] latency=0 link=yes multicast=yes
>|                 resources: irq:166 memory:d4000000-d41fffff memory:d4200000-d4207fff
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
>|              resources: irq:42 memory:d5000000-d50fffff
>|            *-generic
>|                 description: MMC Host
>|                 product: O2 Micro, Inc.
>|                 vendor: O2 Micro, Inc.
>|                 physical id: 0
>|                 bus info: pci@0000:c2:00.0
>|                 logical name: mmc0
>|                 version: 01
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm msi pciexpress bus_master cap_list
>|                 configuration: driver=sdhci-pci latency=0
>|                 resources: irq:143 memory:d5001000-d5001fff memory:d5000000-d5000fff
>|         *-pci:4
>|              description: PCI bridge
>|              product: Strix/Strix Halo GPP Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 2.5
>|              bus info: pci@0000:00:02.5
>|              version: 02
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi ht normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:43 memory:d4f00000-d4ffffff
>|            *-nvme
>|                 description: NVMe device
>|                 product: CT2000P310SSD8
>|                 vendor: Micron/Crucial Technology
>|                 physical id: 0
>|                 bus info: pci@0000:c3:00.0
>|                 logical name: /dev/nvme0
>|                 version: V8CR001
>|                 serial: [REMOVED]
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: nvme pciexpress msix msi pm nvm_express bus_master cap_list
>|                 configuration: driver=nvme latency=0 nqn=nqn.2016-08.com.micron:nvme:nvm-subsystem-sn-252450BBDAA7 state=live
>|                 resources: irq:91 memory:d4f00000-d4f03fff
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
>|                    size: 1863GiB (2TB)
>|                    capabilities: gpt-1.00 partitioned partitioned:gpt
>|                    configuration: guid=a[REMOVEDƒ] logicalsectorsize=512 sectorsize=512 wwid=eui.000000000000000100a0752550bbdaa7
>|                  *-volume:0 UNCLAIMED
>|                       description: Windows FAT volume
>|                       vendor: mkfs.fat
>|                       physical id: 1
>|                       bus info: nvme@0:1,1
>|                       version: FAT32
>|                       serial: [REMOVED]
>|                       size: 598MiB
>|                       capacity: 599MiB
>|                       capabilities: boot fat initialized
>|                       configuration: FATs=2 filesystem=fat name=EFI System Partition
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
>|                       configuration: created=2026-01-01 15:27:16 filesystem=ext4 lastmountpoint=/boot modified=2026-01-13 11:09:46 mount.fstype=ext4 mount.options=rw,seclabel,relatime mounted=2026-01-13 11:09:46 state=mounted
>|                  *-volume:2
>|                       description: EFI partition
>|                       physical id: 3
>|                       bus info: nvme@0:1,3
>|                       logical name: /dev/nvme0n1p3
>|                       serial: [REMOVED]
>|                       size: 1860GiB
>|                       capacity: 1860GiB
>|                       width: 925662296 bits
>|                       capabilities: encrypted luks initialized
>|                       configuration: bits=13810564184 filesystem=luks hash=sha256 version=2
>|         *-pci:5
>|              description: PCI bridge
>|              product: Strix/Strix Halo GPP Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 3.2
>|              bus info: pci@0000:00:03.2
>|              version: 00
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi ht normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:44 memory:d4400000-d48fffff ioport:9800000000(size=34603008)
>|            *-network:0
>|                 description: Ethernet interface
>|                 product: Ethernet Controller E610 10GBASE T
>|                 vendor: Intel Corporation
>|                 physical id: 0
>|                 bus info: pci@0000:c4:00.0
>|                 logical name: enp196s0f0
>|                 version: 00
>|                 serial: [REMOVED]
>|                 capacity: 10Gbit/s
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm msi msix pciexpress vpd bus_master cap_list rom ethernet physical tp 100bt-fd 1000bt-fd 2500bt-fd 5000bt-fd 10000bt-fd autonegotiation
>|                 configuration: autonegotiation=on broadcast=yes driver=ixgbe driverversion=6.19.0-0.rc5.436.vanilla.fc44.x firmware=1.31 0x8000ea8c 1.3863.0 latency=0 link=no multicast=yes port=twisted pair
>|                 resources: iomemory:980-97f iomemory:980-97f irq:162 memory:9801000000-9801ffffff memory:9802004000-9802007fff memory:d4480000-d44fffff memory:d4800000-d48fffff memory:d4700000-d47fffff
>|            *-network:1
>|                 description: Ethernet interface
>|                 product: Ethernet Controller E610 10GBASE T
>|                 vendor: Intel Corporation
>|                 physical id: 0.1
>|                 bus info: pci@0000:c4:00.1
>|                 logical name: enp196s0f1
>|                 version: 00
>|                 serial: [REMOVED]
>|                 capacity: 10Gbit/s
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm msi msix pciexpress vpd bus_master cap_list rom ethernet physical tp 100bt-fd 1000bt-fd 2500bt-fd 5000bt-fd 10000bt-fd autonegotiation
>|                 configuration: autonegotiation=on broadcast=yes driver=ixgbe driverversion=6.19.0-0.rc5.436.vanilla.fc44.x firmware=1.31 0x8000ea8c 1.3863.0 latency=0 link=no multicast=yes port=twisted pair
>|                 resources: iomemory:980-97f iomemory:980-97f irq:200 memory:9800000000-9800ffffff memory:9802000000-9802003fff memory:d4400000-d447ffff memory:d4600000-d46fffff memory:d4500000-d45fffff
>|         *-pci:6
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
>|              resources: irq:45 ioport:f000(size=4096) memory:90000000-a03fffff ioport:4000000000(size=68727865344)
>|            *-display
>|                 description: Display controller
>|                 product: Strix Halo [Radeon Graphics / Radeon 8050S Graphics / Radeon 8060S Graphics]
>|                 vendor: Advanced Micro Devices, Inc. [AMD/ATI]
>|                 physical id: 0
>|                 bus info: pci@0000:c6:00.0
>|                 version: c1
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list
>|                 configuration: driver=amdgpu latency=0
>|                 resources: iomemory:400-3ff irq:160 memory:4000000000-4fffffffff memory:90000000-9fffffff ioport:f000(size=256) memory:a0200000-a02fffff
>|            *-multimedia:0
>|                 description: Audio device
>|                 product: Radeon High Definition Audio Controller
>|                 vendor: Advanced Micro Devices, Inc. [AMD/ATI]
>|                 physical id: 0.1
>|                 bus info: pci@0000:c6:00.1
>|                 logical name: card1
>|                 logical name: /dev/snd/controlC1
>|                 logical name: /dev/snd/hwC1D0
>|                 logical name: /dev/snd/pcmC1D3p
>|                 logical name: /dev/snd/pcmC1D7p
>|                 logical name: /dev/snd/pcmC1D8p
>|                 logical name: /dev/snd/pcmC1D9p
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi hda_compatible bus_master cap_list
>|                 configuration: driver=snd_hda_intel latency=0
>|                 resources: irq:164 memory:a0348000-a034bfff
>|               *-input:0
>|                    product: HD-Audio Generic HDMI/DP,pcm=7
>|                    physical id: 0
>|                    logical name: input10
>|                    logical name: /dev/input/event8
>|               *-input:1
>|                    product: HD-Audio Generic HDMI/DP,pcm=8
>|                    physical id: 1
>|                    logical name: input11
>|                    logical name: /dev/input/event9
>|               *-input:2
>|                    product: HD-Audio Generic HDMI/DP,pcm=9
>|                    physical id: 2
>|                    logical name: input12
>|                    logical name: /dev/input/event10
>|               *-input:3
>|                    product: HD-Audio Generic HDMI/DP,pcm=3
>|                    physical id: 3
>|                    logical name: input9
>|                    logical name: /dev/input/event7
>|            *-generic
>|                 description: Encryption controller
>|                 product: Strix/Krackan/Strix Halo CCP/ASP
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.2
>|                 bus info: pci@0000:c6:00.2
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list
>|                 configuration: driver=ccp latency=0
>|                 resources: irq:55 memory:a0100000-a01fffff memory:a034c000-a034dfff
>|            *-usb
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
>|                 resources: irq:25 memory:a0000000-a00fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.19.0-0.rc5.436.vanilla.fc44.x86_64 xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@1
>|                    logical name: usb1
>|                    version: 6.19
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.19.0-0.rc5.436.vanilla.fc44.x86_64 xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@2
>|                    logical name: usb2
>|                    version: 6.19
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|            *-multimedia:1
>|                 description: Multimedia controller
>|                 product: Audio Coprocessor
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.5
>|                 bus info: pci@0000:c6:00.5
>|                 version: 70
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi bus_master cap_list
>|                 configuration: driver=snd_acp_pci latency=0
>|                 resources: iomemory:500-4ff irq:160 memory:a0300000-a033ffff memory:5000000000-50007fffff
>|            *-multimedia:2
>|                 description: Audio device
>|                 product: Ryzen HD Audio Controller
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.6
>|                 bus info: pci@0000:c6:00.6
>|                 logical name: card2
>|                 logical name: /dev/snd/controlC2
>|                 logical name: /dev/snd/hwC2D0
>|                 logical name: /dev/snd/pcmC2D0c
>|                 logical name: /dev/snd/pcmC2D0p
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi hda_compatible bus_master cap_list
>|                 configuration: driver=snd_hda_intel latency=0
>|                 resources: irq:165 memory:a0340000-a0347fff
>|               *-input:0
>|                    product: HD-Audio Generic Rear Mic
>|                    physical id: 0
>|                    logical name: input13
>|                    logical name: /dev/input/event11
>|               *-input:1
>|                    product: HD-Audio Generic Front Mic
>|                    physical id: 1
>|                    logical name: input14
>|                    logical name: /dev/input/event12
>|               *-input:2
>|                    product: HD-Audio Generic Line Out
>|                    physical id: 2
>|                    logical name: input15
>|                    logical name: /dev/input/event13
>|               *-input:3
>|                    product: HD-Audio Generic Front Headphone
>|                    physical id: 3
>|                    logical name: input16
>|                    logical name: /dev/input/event14
>|         *-pci:7
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
>|              resources: irq:46 memory:d4d00000-d4efffff ioport:9802200000(size=1048576)
>|            *-generic:0 UNCLAIMED
>|                 description: Non-Essential Instrumentation
>|                 product: Strix/Strix Halo PCIe Dummy Function
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0
>|                 bus info: pci@0000:c7:00.0
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
>|                 bus info: pci@0000:c7:00.1
>|                 version: 11
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list
>|                 configuration: driver=amdxdna latency=0
>|                 resources: iomemory:980-97f irq:58 memory:d4d00000-d4dfffff memory:d4e00000-d4e01fff memory:9802200000-980227ffff memory:d4e03000-d4e03fff memory:d4e02000-d4e02fff
>|         *-pci:8
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
>|              resources: irq:47 memory:d4900000-d4cfffff
>|            *-usb:0
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0
>|                 bus info: pci@0000:c8:00.0
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:49 memory:d4b00000-d4bfffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.19.0-0.rc5.436.vanilla.fc44.x86_64 xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@3
>|                    logical name: usb3
>|                    version: 6.19
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=5 speed=480Mbit/s
>|                  *-usb:0
>|                       description: Keyboard
>|                       product: Glinet Glinet Composite Device
>|                       vendor: Glinet
>|                       physical id: 1
>|                       bus info: usb@3:1
>|                       logical name: scsi1
>|                       logical name: scsi0
>|                       logical name: input2
>|                       logical name: /dev/input/event1
>|                       logical name: input2::capslock
>|                       logical name: input2::compose
>|                       logical name: input2::kana
>|                       logical name: input2::numlock
>|                       logical name: input2::scrolllock
>|                       logical name: input4
>|                       logical name: /dev/input/event2
>|                       logical name: /dev/input/js0
>|                       logical name: /dev/input/mouse0
>|                       logical name: input5
>|                       logical name: /dev/input/event3
>|                       logical name: /dev/input/mouse1
>|                       version: 1.00
>|                       serial: [REMOVED]
>|                       capabilities: usb-2.00 emulated scsi-host usb
>|                       configuration: driver=usb-storage maxpower=250mA speed=480Mbit/s
>|                     *-disk
>|                          description: SCSI Disk
>|                          product: Flash Drive
>|                          vendor: Glinet
>|                          physical id: 0
>|                          bus info: scsi@1:0.0.0
>|                          logical name: /dev/sda
>|                          version: 1.00
>|                          capabilities: removable
>|                          configuration: ansiversion=2 logicalsectorsize=512 sectorsize=512
>|                        *-medium
>|                             physical id: 0
>|                             logical name: /dev/sda
>|                     *-cdrom
>|                          description: SCSI CD-ROM
>|                          product: Flash Drive
>|                          vendor: Glinet
>|                          physical id: 1
>|                          bus info: scsi@0:0.0.0
>|                          logical name: /dev/cdrom
>|                          logical name: /dev/sr0
>|                          version: 1.00
>|                          capabilities: removable audio
>|                          configuration: ansiversion=2 status=nodisc
>|                  *-usb:1 UNCLAIMED
>|                       description: Generic USB device
>|                       product: EgisTec EH577
>|                       vendor: EgisTec
>|                       physical id: 3
>|                       bus info: usb@3:3
>|                       version: 10.41
>|                       serial: [REMOVED]
>|                       capabilities: usb-2.00
>|                       configuration: maxpower=100mA speed=480Mbit/s
>|                  *-usb:2
>|                       description: Audio device
>|                       product: POROSVOC POROSVOC
>|                       vendor: POROSVOC
>|                       physical id: 4
>|                       bus info: usb@3:4
>|                       logical name: card0
>|                       logical name: /dev/snd/controlC0
>|                       logical name: /dev/snd/pcmC0D0c
>|                       logical name: input7
>|                       logical name: /dev/input/event5
>|                       version: 1.00
>|                       serial: [REMOVED]
>|                       capabilities: usb-1.10 audio-control usb
>|                       configuration: driver=usbhid maxpower=50mA speed=12Mbit/s
>|                  *-usb:3
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
>|                    vendor: Linux 6.19.0-0.rc5.436.vanilla.fc44.x86_64 xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@4
>|                    logical name: usb4
>|                    version: 6.19
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=2 speed=10000Mbit/s
>|            *-usb:1
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.3
>|                 bus info: pci@0000:c8:00.3
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:51 memory:d4a00000-d4afffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.19.0-0.rc5.436.vanilla.fc44.x86_64 xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@5
>|                    logical name: usb5
>|                    version: 6.19
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.19.0-0.rc5.436.vanilla.fc44.x86_64 xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@6
>|                    logical name: usb6
>|                    version: 6.19
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|            *-usb:2
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.4
>|                 bus info: pci@0000:c8:00.4
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:53 memory:d4900000-d49fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.19.0-0.rc5.436.vanilla.fc44.x86_64 xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@7
>|                    logical name: usb7
>|                    version: 6.19
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.19.0-0.rc5.436.vanilla.fc44.x86_64 xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@8
>|                    logical name: usb8
>|                    version: 6.19
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|            *-usb:3
>|                 description: USB controller
>|                 product: Strix Halo USB4 Host Router
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.5
>|                 bus info: pci@0000:c8:00.5
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix usb4_host_interface bus_master cap_list
>|                 configuration: driver=thunderbolt latency=0
>|                 resources: irq:125 memory:d4c80000-d4cfffff
>|            *-usb:4
>|                 description: USB controller
>|                 product: Strix Halo USB4 Host Router
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.6
>|                 bus info: pci@0000:c8:00.6
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix usb4_host_interface bus_master cap_list
>|                 configuration: driver=thunderbolt latency=0
>|                 resources: irq:49 memory:d4c00000-d4c7ffff
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
>|                 product: PnP device PNP0c02
>|                 physical id: 0
>|                 capabilities: pnp
>|                 configuration: driver=system
>|            *-pnp00:01
>|                 product: PnP device PNP0b00
>|                 physical id: 1
>|                 capabilities: pnp
>|                 configuration: driver=rtc_cmos
>|            *-pnp00:02
>|                 product: PnP device PNP0c02
>|                 physical id: 2
>|                 capabilities: pnp
>|                 configuration: driver=system
>|            *-pnp00:03
>|                 product: PnP device PNP0c02
>|                 physical id: 3
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
>|        product: Video Bus
>|        physical id: 2
>|        logical name: input6
>|        logical name: /dev/input/event4
>|        capabilities: platform
>|   *-input:2
>|        product: PC Speaker
>|        physical id: 3
>|        logical name: input8
>|        logical name: /dev/input/event6
>|        capabilities: isa
>| ```
