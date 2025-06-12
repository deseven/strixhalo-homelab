# Hardware Monitoring

### Problem
When running Linux, especially older 6.x kernels, you might find that there are no thermal/power sensors available.

### Solution
I tried several different options, but the only thing that worked was [CoreFreq](https://github.com/cyring/CoreFreq). It has its own kernel module, daemon and console client. The installation is pretty straightforward, just follow the official installation guide (note that there is [a separate instruction for Proxomox](https://github.com/cyring/CoreFreq?tab=readme-ov-file#proxmox)). Don't forget to enable the daemon afterwards with `systemctl enable corefreqd`.

![](./corefreq-sensors.png)
