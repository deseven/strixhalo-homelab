# VM iGPU Passthrough

### Setting Up
This guide seems to work for Strix Halo:  
https://github.com/isc30/ryzen-gpu-passthrough-proxmox

This is mostly tied to Proxmox, but should still be applicable to regular systems with KVM installed.

### Notes
 - hardware IDs are `1002:1586` (iGPU) and `1002:1640` (audio)
 - the 'reset bug' is here, I found no way to avoid it
 - set the fixed VRAM amount in the BIOS and never change it on the OS level, otherwise expect major slowdowns and crashes
 - [this issue](https://github.com/isc30/ryzen-gpu-passthrough-proxmox/issues/112) might be worth looking into

### Files
(taken from [[EVO-X2 | Devices/GMKtec EVO-X2]], BIOS version 1.04)
 - [vbios_8060s.bin](./vbios_8060s.bin)
 - [AMDGopDriver.rom](./AMDGopDriver.rom)
