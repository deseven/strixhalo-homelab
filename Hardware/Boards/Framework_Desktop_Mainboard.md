# Framework Desktop Mainboard

A motherboard used in [Framework Desktop](../PCs/Framework_Desktop.md), could be bought separately in three different configurations (32, 64 or 128GB of RAM).

https://frame.work/products/framework-desktop-mainboard-amd-ryzen-ai-max-300-series

Here are some outputs created on a 128GB Framework Desktop with Linux kernel 6.18.4:

>| # lspci -tv
>| ```-[0000:00]-+-00.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Root Complex
>|         +-00.2  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo IOMMU
>|         +-01.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>|         +-01.1-[01-5f]--
>|         +-01.2-[60-be]--
>|         +-02.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>|         +-02.1-[bf]----00.0  Realtek Semiconductor Co., Ltd. RTL8126 5GbE Controller
>|         +-02.3-[c0]----00.0  MAXIO Technology (Hangzhou) Ltd. NVMe SSD Controller MAP1202 (DRAM-less)
>|         +-02.5-[c1]----00.0  Samsung Electronics Co Ltd NVMe SSD Controller S4LV008[Pascal]
>|         +-03.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>|         +-03.1-[c2]----00.0  Samsung Electronics Co Ltd NVMe SSD Controller S4LV008[Pascal]
>|         +-08.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo Dummy Host Bridge
>|         +-08.1-[c3]--+-00.0  Advanced Micro Devices, Inc. [AMD/ATI] Strix Halo [Radeon Graphics / Radeon 8050S Graphics / Radeon 8060S Graphics]
>|         |            +-00.1  Advanced Micro Devices, Inc. [AMD/ATI] Radeon High Definition Audio Controller [Rembrandt/Strix]
>|         |            +-00.2  Advanced Micro Devices, Inc. [AMD] Strix/Krackan/Strix Halo CCP/ASP
>|         |            +-00.4  Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>|         |            \-00.6  Advanced Micro Devices, Inc. [AMD] Family 17h/19h/1ah HD Audio Controller
>|         +-08.2-[c4]--+-00.0  Advanced Micro Devices, Inc. [AMD] Strix/Strix Halo PCIe Dummy Function
>|         |            \-00.1  Advanced Micro Devices, Inc. [AMD] Strix/Krackan/Strix Halo Neural Processing Unit
>|         +-08.3-[c5]--+-00.0  Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>|         |            +-00.3  Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>|         |            +-00.4  Advanced Micro Devices, Inc. [AMD] Strix Halo USB 3.1 xHCI
>|         |            +-00.5  Advanced Micro Devices, Inc. [AMD] Strix Halo USB4 Host Router
>|         |            \-00.6  Advanced Micro Devices, Inc. [AMD] Strix Halo USB4 Host Router
>|         +-14.0  Advanced Micro Devices, Inc. [AMD] FCH SMBus Controller
>|         +-14.3  Advanced Micro Devices, Inc. [AMD] FCH LPC Bridge
>|         +-18.0  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 0
>|         +-18.1  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 1
>|         +-18.2  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 2
>|         +-18.3  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 3
>|         +-18.4  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 4
>|         +-18.5  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 5
>|         +-18.6  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 6
>|         \-18.7  Advanced Micro Devices, Inc. [AMD] Strix Halo Data Fabric; Function 7
>| ```

>| # lsusb -t
>| ```/:  Bus 001.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/1p, 480M
>|     |__ Port 001: Dev 002, If 0, Class=Hub, Driver=hub/2p, 480M
>| /:  Bus 002.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/1p, 10000M
>|     |__ Port 001: Dev 002, If 0, Class=Hub, Driver=hub/2p, 10000M
>| /:  Bus 003.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/5p, 480M
>|     |__ Port 002: Dev 002, If 0, Class=Hub, Driver=hub/2p, 480M
>| /:  Bus 004.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/2p, 10000M
>|     |__ Port 002: Dev 002, If 0, Class=Hub, Driver=hub/2p, 10000M
>| /:  Bus 005.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/1p, 480M
>| /:  Bus 006.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/1p, 10000M
>| /:  Bus 007.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/1p, 480M
>| /:  Bus 008.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/1p, 10000M
>| ```

>| # lshw -sanitize
>| ```/:  Bus 001.Port 001: Dev 001, Class=root_hub, Driver=xhci_hcd/1p, 480M
>| computer
>|     description: Mini PC
>|     product: Desktop (AMD Ryzen AI Max 300 Series) (FRAMDACP06)
>|     vendor: Framework
>|     version: A6
>|     serial: [REMOVED]
>|     width: 64 bits
>|     capabilities: smbios-3.3.0 dmi-3.3.0 smp vsyscall32
>|     configuration: boot=normal chassis=mini family=Desktop sku=FRAMDACP06 uuid=[REMOVED]
>|   *-core
>|        description: Motherboard
>|        product: FRANMFCP06
>|        vendor: Framework
>|        physical id: 0
>|        version: A6
>|        serial: [REMOVED]
>|        slot: *
>|      *-firmware
>|           description: BIOS
>|           vendor: INSYDE Corp.
>|           physical id: 0
>|           version: 03.02
>|           date: 07/22/2025
>|           size: 1MiB
>|           capacity: 32MiB
>|           capabilities: pci upgrade shadowing cdboot bootselect int9keyboard int10video acpi usb biosbootspecification uefi
>|      *-cpu
>|           description: CPU
>|           product: AMD RYZEN AI MAX+ 395 w/ Radeon 8060S
>|           vendor: Advanced Micro Devices [AMD]
>|           physical id: 4
>|           bus info: cpu@0
>|           version: 26.112.0
>|           serial: [REMOVED]
>|           slot: FP11LPDDR5x
>|           size: 3072MHz
>|           capacity: 5187MHz
>|           width: 64 bits
>|           clock: 100MHz
>|           capabilities: lm fpu fpu_exception wp vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx mmxext fxsr_opt pdpe1gb rdtscp x86-64 constant_tsc rep_good amd_lbr_v2 nopl xtopology nonstop_tsc cpuid extd_apicid aperfmperf rapl pni pclmulqdq monitor ssse3 fma cx16 sse4_1 sse4_2 movbe popcnt aes xsave avx f16c rdrand lahf_lm cmp_legacy svm extapic cr8_legacy abm sse4a misalignsse 3dnowprefetch osvw ibs skinit wdt tce topoext perfctr_core perfctr_nb bpext perfctr_llc mwaitx cpuid_fault cpb cat_l3 cdp_l3 hw_pstate ssbd mba perfmon_v2 ibrs ibpb stibp ibrs_enhanced vmmcall fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid cqm rdt_a avx512f avx512dq rdseed adx smap avx512ifma clflushopt clwb avx512cd sha_ni avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves cqm_llc cqm_occup_llc cqm_mbm_total cqm_mbm_local user_shstk avx_vnni avx512_bf16 clzero irperf xsaveerptr rdpru wbnoinvd cppc arat npt lbrv svm_lock nrip_save tsc_scale vmcb_clean flushbyasid decodeassists pausefilter pfthreshold avic v_vmsave_vmload vgif x2avic v_spec_ctrl vnmi avx512vbmi umip pku ospke avx512_vbmi2 gfni vaes vpclmulqdq avx512_vnni avx512_bitalg avx512_vpopcntdq rdpid bus_lock_detect movdiri movdir64b overflow_recov succor smca fsrm avx512_vp2intersect flush_l1d amd_lbr_pmc_freeze cpufreq
>|           configuration: cores=16 enabledcores=16 microcode=191889458 threads=32
>|         *-cache:0
>|              description: L1 cache
>|              physical id: 5
>|              slot: L1 - Cache
>|              size: 1280KiB
>|              capacity: 1280KiB
>|              clock: 1GHz (1.0ns)
>|              capabilities: pipeline-burst internal write-back unified
>|              configuration: level=1
>|         *-cache:1
>|              description: L2 cache
>|              physical id: 6
>|              slot: L2 - Cache
>|              size: 16MiB
>|              capacity: 16MiB
>|              clock: 1GHz (1.0ns)
>|              capabilities: pipeline-burst internal write-back unified
>|              configuration: level=2
>|         *-cache:2
>|              description: L3 cache
>|              physical id: 7
>|              slot: L3 - Cache
>|              size: 64MiB
>|              capacity: 64MiB
>|              clock: 1GHz (1.0ns)
>|              capabilities: pipeline-burst internal write-back unified
>|              configuration: level=3
>|      *-memory
>|           description: System Memory
>|           physical id: 13
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
>|              resources: irq:33 ioport:7000(size=16384) memory:98000000-afffffff ioport:4800000000(size=137438953472)
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
>|              resources: irq:34 ioport:3000(size=16384) memory:80000000-97ffffff ioport:2800000000(size=137438953472)
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
>|              resources: irq:35 ioport:2000(size=4096) memory:b0f00000-b0ffffff
>|            *-network
>|                 description: Ethernet interface
>|                 product: RTL8126 5GbE Controller
>|                 vendor: Realtek Semiconductor Co., Ltd.
>|                 physical id: 0
>|                 bus info: pci@0000:bf:00.0
>|                 logical name: nic0
>|                 version: 01
>|                 serial: [REMOVED]
>|                 capacity: 1Gbit/s
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm msi pciexpress msix vpd bus_master cap_list ethernet physical tp mii 10bt 10bt-fd 100bt 100bt-fd 1000bt-fd autonegotiation
>|                 configuration: autonegotiation=on broadcast=yes driver=r8169 driverversion=6.17.4-2-pve duplex=full firmware=rtl8126a-3_0.0.5 08/30/24 latency=0 link=yes multicast=yes port=twisted pair
>|                 resources: irq:25 ioport:2000(size=256) memory:b0f00000-b0f0ffff memory:b0f10000-b0f13fff
>|         *-pci:3
>|              description: PCI bridge
>|              product: Strix/Strix Halo GPP Bridge
>|              vendor: Advanced Micro Devices, Inc. [AMD]
>|              physical id: 2.3
>|              bus info: pci@0000:00:02.3
>|              version: 02
>|              width: 32 bits
>|              clock: 33MHz
>|              capabilities: pci pm pciexpress msi ht normal_decode bus_master cap_list
>|              configuration: driver=pcieport
>|              resources: irq:36 memory:b0e00000-b0efffff
>|            *-nvme
>|                 description: NVMe device
>|                 product: QS-N2230-AE-1T
>|                 vendor: MAXIO Technology (Hangzhou) Ltd.
>|                 physical id: 0
>|                 bus info: pci@0000:c0:00.0
>|                 logical name: /dev/nvme0
>|                 version: GT18c634
>|                 serial: [REMOVED]
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: nvme pm msi pciexpress msix nvm_express bus_master cap_list
>|                 configuration: driver=nvme latency=0 nqn=nqn.2014-08.com.00000:nvme:AA253820035 state=live
>|                 resources: irq:68 memory:b0e00000-b0e03fff
>|               *-namespace:0
>|                    description: NVMe disk
>|                    physical id: 0
>|                    logical name: hwmon5
>|               *-namespace:1
>|                    description: NVMe disk
>|                    physical id: 2
>|                    logical name: /dev/ng0n1
>|               *-namespace:2
>|                    description: NVMe disk
>|                    physical id: 1
>|                    bus info: nvme@0:1
>|                    logical name: /dev/nvme0n1
>|                    size: 953GiB (1024GB)
>|                    capabilities: gpt-1.00 partitioned partitioned:gpt
>|                    configuration: guid=c8c13d80-f27a-41ce-baa7-b62c43a9fea9 logicalsectorsize=512 sectorsize=512 wwid=nvme.1e4b-4141323533383230303335-51532d4e323233302d41452d3154-00000001
>|                  *-volume:0
>|                       description: BIOS Boot partition
>|                       vendor: EFI
>|                       physical id: 1
>|                       bus info: nvme@0:1,1
>|                       logical name: /dev/nvme0n1p1
>|                       serial: [REMOVED]
>|                       capacity: 1006KiB
>|                       capabilities: nofs
>|                  *-volume:1 UNCLAIMED
>|                       description: Windows FAT volume
>|                       vendor: mkfs.fat
>|                       physical id: 2
>|                       bus info: nvme@0:1,2
>|                       version: FAT32
>|                       serial: [REMOVED]
>|                       size: 1022MiB
>|                       capacity: 1023MiB
>|                       capabilities: boot fat initialized
>|                       configuration: FATs=2 filesystem=fat
>|                  *-volume:2
>|                       description: LVM Physical Volume
>|                       vendor: Linux
>|                       physical id: 3
>|                       bus info: nvme@0:1,3
>|                       logical name: /dev/nvme0n1p3
>|                       serial: [REMOVED]
>|                       size: 951GiB
>|                       capabilities: multi lvm2
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
>|              resources: irq:37 memory:b0d00000-b0dfffff
>|            *-nvme
>|                 description: NVMe device
>|                 product: Samsung SSD 990 PRO 4TB
>|                 vendor: Samsung Electronics Co Ltd
>|                 physical id: 0
>|                 bus info: pci@0000:c1:00.0
>|                 logical name: /dev/nvme1
>|                 version: 4B2QJXD7
>|                 serial: [REMOVED]
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: nvme pm msi pciexpress msix nvm_express bus_master cap_list
>|                 configuration: driver=nvme latency=0 nqn=nqn.1994-11.com.samsung:nvme:990PRO:M.2:S7KGNU0Y903057F state=live
>|                 resources: irq:67 memory:b0d00000-b0d03fff
>|               *-namespace:0
>|                    description: NVMe disk
>|                    physical id: 0
>|                    logical name: hwmon3
>|               *-namespace:1
>|                    description: NVMe disk
>|                    physical id: 2
>|                    logical name: /dev/ng1n1
>|               *-namespace:2
>|                    description: NVMe disk
>|                    physical id: 1
>|                    bus info: nvme@1:1
>|                    logical name: /dev/nvme1n1
>|                    size: 3726GiB (4TB)
>|                    configuration: logicalsectorsize=512 sectorsize=512 wwid=eui.0025384951a06968
>|         *-pci:5
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
>|              resources: irq:38 memory:b0c00000-b0cfffff
>|            *-nvme
>|                 description: NVMe device
>|                 product: Samsung SSD 990 PRO 4TB
>|                 vendor: Samsung Electronics Co Ltd
>|                 physical id: 0
>|                 bus info: pci@0000:c2:00.0
>|                 logical name: /dev/nvme2
>|                 version: 4B2QJXD7
>|                 serial: [REMOVED]
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: nvme pm msi pciexpress msix nvm_express bus_master cap_list
>|                 configuration: driver=nvme latency=0 nqn=nqn.1994-11.com.samsung:nvme:990PRO:M.2:S7KGNU0YA06076R state=live
>|                 resources: irq:69 memory:b0c00000-b0c03fff
>|               *-namespace:0
>|                    description: NVMe disk
>|                    physical id: 0
>|                    logical name: hwmon4
>|               *-namespace:1
>|                    description: NVMe disk
>|                    physical id: 2
>|                    logical name: /dev/ng2n1
>|               *-namespace:2
>|                    description: NVMe disk
>|                    physical id: 1
>|                    bus info: nvme@2:1
>|                    logical name: /dev/nvme2n1
>|                    size: 3726GiB (4TB)
>|                    configuration: logicalsectorsize=512 sectorsize=512 wwid=eui.0025384a51a0bfcf
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
>|              resources: irq:39 ioport:1000(size=4096) memory:b0000000-b05fffff ioport:6800000000(size=536870912)
>|            *-display
>|                 description: Display controller
>|                 product: Strix Halo [Radeon Graphics / Radeon 8050S Graphics / Radeon 8060S Graphics]
>|                 vendor: Advanced Micro Devices, Inc. [AMD/ATI]
>|                 physical id: 0
>|                 bus info: pci@0000:c3:00.0
>|                 logical name: /dev/fb0
>|                 version: c1
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list fb
>|                 configuration: depth=32 driver=amdgpu latency=0 mode=1680x1440 resolution=1680,1440 visual=truecolor xres=1680 yres=1440
>|                 resources: iomemory:680-67f irq:168 memory:6800000000-681fffffff memory:b0000000-b01fffff ioport:1000(size=256) memory:b0400000-b04fffff
>|            *-multimedia:0
>|                 description: Audio device
>|                 product: Radeon High Definition Audio Controller [Rembrandt/Strix]
>|                 vendor: Advanced Micro Devices, Inc. [AMD/ATI]
>|                 physical id: 0.1
>|                 bus info: pci@0000:c3:00.1
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
>|                 capabilities: pm pciexpress msi bus_master cap_list
>|                 configuration: driver=snd_hda_intel latency=0
>|                 resources: irq:166 memory:b0508000-b050bfff
>|               *-input:0
>|                    product: HD-Audio Generic HDMI/DP,pcm=3
>|                    physical id: 0
>|                    logical name: input3
>|                    logical name: /dev/input/event3
>|               *-input:1
>|                    product: HD-Audio Generic HDMI/DP,pcm=7
>|                    physical id: 1
>|                    logical name: input4
>|                    logical name: /dev/input/event4
>|               *-input:2
>|                    product: HD-Audio Generic HDMI/DP,pcm=8
>|                    physical id: 2
>|                    logical name: input5
>|                    logical name: /dev/input/event5
>|               *-input:3
>|                    product: HD-Audio Generic HDMI/DP,pcm=9
>|                    physical id: 3
>|                    logical name: input6
>|                    logical name: /dev/input/event6
>|            *-generic
>|                 description: Encryption controller
>|                 product: Strix/Krackan/Strix Halo CCP/ASP
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.2
>|                 bus info: pci@0000:c3:00.2
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list
>|                 configuration: driver=ccp latency=0
>|                 resources: irq:129 memory:b0300000-b03fffff memory:b050c000-b050dfff
>|            *-usb
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.4
>|                 bus info: pci@0000:c3:00.4
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:25 memory:b0200000-b02fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.17.4-2-pve xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@1
>|                    logical name: usb1
>|                    version: 6.17
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|                  *-usb
>|                       description: USB hub
>|                       product: 2-Port USB 2.0 Hub
>|                       vendor: Generic
>|                       physical id: 1
>|                       bus info: usb@1:1
>|                       version: 1.88
>|                       capabilities: usb-2.10
>|                       configuration: driver=hub slots=2 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.17.4-2-pve xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@2
>|                    logical name: usb2
>|                    version: 6.17
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|                  *-usb
>|                       description: USB hub
>|                       product: 2-Port USB 3.0 Hub
>|                       vendor: Generic
>|                       physical id: 1
>|                       bus info: usb@2:1
>|                       version: 1.88
>|                       capabilities: usb-3.20
>|                       configuration: driver=hub slots=2 speed=10000Mbit/s
>|            *-multimedia:1
>|                 description: Audio device
>|                 product: Family 17h/19h/1ah HD Audio Controller
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.6
>|                 bus info: pci@0000:c3:00.6
>|                 logical name: card1
>|                 logical name: /dev/snd/controlC1
>|                 logical name: /dev/snd/hwC1D0
>|                 logical name: /dev/snd/pcmC1D0c
>|                 logical name: /dev/snd/pcmC1D0p
>|                 version: 00
>|                 width: 32 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi bus_master cap_list
>|                 configuration: driver=snd_hda_intel latency=0
>|                 resources: irq:167 memory:b0500000-b0507fff
>|               *-input:0
>|                    product: HD-Audio Generic Mic
>|                    physical id: 0
>|                    logical name: input7
>|                    logical name: /dev/input/event7
>|               *-input:1
>|                    product: HD-Audio Generic Headphone Front
>|                    physical id: 1
>|                    logical name: input8
>|                    logical name: /dev/input/event8
>|               *-input:2
>|                    product: HD-Audio Generic Front Headphone Surround
>|                    physical id: 2
>|                    logical name: input9
>|                    logical name: /dev/input/event9
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
>|              resources: irq:40 memory:b0a00000-b0bfffff ioport:6820000000(size=1048576)
>|            *-generic:0 UNCLAIMED
>|                 description: Non-Essential Instrumentation
>|                 product: Strix/Strix Halo PCIe Dummy Function
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0
>|                 bus info: pci@0000:c4:00.0
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
>|                 bus info: pci@0000:c4:00.1
>|                 version: 11
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix bus_master cap_list
>|                 configuration: driver=amdxdna latency=0
>|                 resources: iomemory:680-67f irq:132 memory:b0a00000-b0afffff memory:b0b00000-b0b01fff memory:6820000000-682007ffff memory:b0b03000-b0b03fff memory:b0b02000-b0b02fff
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
>|              resources: irq:41 memory:b0600000-b09fffff
>|            *-usb:0
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0
>|                 bus info: pci@0000:c5:00.0
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:60 memory:b0600000-b06fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.17.4-2-pve xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@3
>|                    logical name: usb3
>|                    version: 6.17
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=5 speed=480Mbit/s
>|                  *-usb
>|                       description: USB hub
>|                       product: USB2.1 Hub
>|                       vendor: GenesysLogic
>|                       physical id: 2
>|                       bus info: usb@3:2
>|                       version: 10.01
>|                       capabilities: usb-2.10
>|                       configuration: driver=hub slots=2 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.17.4-2-pve xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@4
>|                    logical name: usb4
>|                    version: 6.17
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=2 speed=10000Mbit/s
>|                  *-usb
>|                       description: USB hub
>|                       product: USB3.2 Hub
>|                       vendor: GenesysLogic
>|                       physical id: 2
>|                       bus info: usb@4:2
>|                       version: 10.01
>|                       capabilities: usb-3.20
>|                       configuration: driver=hub slots=2 speed=10000Mbit/s
>|            *-usb:1
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.3
>|                 bus info: pci@0000:c5:00.3
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:63 memory:b0700000-b07fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.17.4-2-pve xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@5
>|                    logical name: usb5
>|                    version: 6.17
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.17.4-2-pve xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@6
>|                    logical name: usb6
>|                    version: 6.17
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|            *-usb:2
>|                 description: USB controller
>|                 product: Strix Halo USB 3.1 xHCI
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.4
>|                 bus info: pci@0000:c5:00.4
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix xhci bus_master cap_list
>|                 configuration: driver=xhci_hcd latency=0
>|                 resources: irq:65 memory:b0800000-b08fffff
>|               *-usbhost:0
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.17.4-2-pve xhci-hcd
>|                    physical id: 0
>|                    bus info: usb@7
>|                    logical name: usb7
>|                    version: 6.17
>|                    capabilities: usb-2.00
>|                    configuration: driver=hub slots=1 speed=480Mbit/s
>|               *-usbhost:1
>|                    product: xHCI Host Controller
>|                    vendor: Linux 6.17.4-2-pve xhci-hcd
>|                    physical id: 1
>|                    bus info: usb@8
>|                    logical name: usb8
>|                    version: 6.17
>|                    capabilities: usb-3.10
>|                    configuration: driver=hub slots=1 speed=10000Mbit/s
>|            *-usb:3
>|                 description: USB controller
>|                 product: Strix Halo USB4 Host Router
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.5
>|                 bus info: pci@0000:c5:00.5
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix usb4_host_interface bus_master cap_list
>|                 configuration: driver=thunderbolt latency=0
>|                 resources: irq:42 memory:b0900000-b097ffff
>|            *-usb:4
>|                 description: USB controller
>|                 product: Strix Halo USB4 Host Router
>|                 vendor: Advanced Micro Devices, Inc. [AMD]
>|                 physical id: 0.6
>|                 bus info: pci@0000:c5:00.6
>|                 version: 00
>|                 width: 64 bits
>|                 clock: 33MHz
>|                 capabilities: pm pciexpress msi msix usb4_host_interface bus_master cap_list
>|                 configuration: driver=thunderbolt latency=0
>|                 resources: irq:60 memory:b0980000-b09fffff
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
>|                 product: PnP device PNP0c01
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
>|   *-power UNCLAIMED
>|        description: UNKNOWN
>|        product: UNKNOWN
>|        vendor: UNKNOWN
>|        physical id: 1
>|        version: UNKNOWN
>|        serial: [REMOVED]
>|        capacity: 32768mWh
>|   *-input:0
>|        product: Power Button
>|        physical id: 2
>|        logical name: input0
>|        logical name: /dev/input/event0
>|        capabilities: platform
>|   *-input:1
>|        product: Video Bus
>|        physical id: 3
>|        logical name: input1
>|        logical name: /dev/input/event1
>|        capabilities: platform
>|   *-input:2
>|        product: PC Speaker
>|        physical id: 4
>|        logical name: input2
>|        logical name: /dev/input/event2
>|        capabilities: isa
>| ```

_Note: this particular machine had the stock Wi-Fi/BT card replaced with an [M.2 A+E Key SSD](https://cwwk.net/products/cwwk-256g-m-2-a-e-key-2230-ssd)_
