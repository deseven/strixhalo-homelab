# iGPU Passthrough

### Setting Up
This guide seems to work in general for Strix Halo:  
https://github.com/isc30/ryzen-gpu-passthrough-proxmox

### Notes
 - the 'reset bug' is here, I found no way to avoid it
 - set the fixed VRAM amount in the BIOS, otherwise expect major slowdowns and crashes
 - [this issue](https://github.com/isc30/ryzen-gpu-passthrough-proxmox/issues/112) might be worth looking into

### Files
(taken from [GMKtec EVO-X2](/Devices/GMKtec%20EVO-X2) BIOS v.1.04)
 - vbios_8060s.bin
 - AMDGopDriver.rom
