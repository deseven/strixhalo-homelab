# VM iGPU Passthrough

### Setting Up
This guide seems to work for Strix Halo:  
https://github.com/isc30/ryzen-gpu-passthrough-proxmox

This is mostly tied to Proxmox, but should still be applicable to regular systems with QEMU installed.

### Configuration
```bash
# /etc/kernel/cmdline
... iommu=pt initcall_blacklist=sysfb_init
```

```bash
# /etc/modules
vfio
vfio_iommu_type1
vfio_pci
```

```bash
# /etc/modprobe.d/blacklist.conf
blacklist radeon
blacklist amdgpu
blacklist snd_hda_intel
```

```bash
# /etc/modprobe.d/vfio.conf
options vfio-pci ids=1002:1586,1002:1640 disable_vga=1
```

```bash
# vm.conf for QEMU
machine: pc-q35-9.2+pve1,viommu=virtio
cpu: host
# don't forget to replace the IDs if needed
hostpci0: 0000:c6:00.0,pcie=1,romfile=vbios_8060s.bin,x-vga=1
hostpci1: 0000:c6:00.1,pcie=1,romfile=AMDGopDriver.rom
```

Proxmox VM (ignore vbios name):  
![8060s GPU Passthrough in Proxmox](./proxmox-8060s-passthrough.png)

### Notes
 - hardware IDs are `1002:1586` (iGPU) and `1002:1640` (audio)
 - the 'reset bug' is here, I found no way to avoid it
 - if your VM crashes during GPU driver install, switch the CPU type to something generic, install the driver, then return it back to `host`
 - set the fixed VRAM amount in the BIOS and never change it on the OS level, otherwise expect major slowdowns and crashes
 - [this issue](https://github.com/isc30/ryzen-gpu-passthrough-proxmox/issues/112) might be worth looking into

### Files
(taken from [[EVO-X2|Devices/GMKtec-EVO-X2]], BIOS version 1.04)
 - [vbios_8060s.bin](./vbios_8060s.bin)
 - [AMDGopDriver.rom](./AMDGopDriver.rom)
