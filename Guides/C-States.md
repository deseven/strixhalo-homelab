# C-States

### Problem
When running Linux, especially older 6.x kernels, you might find that the CPU doesn't use C-states below C1, constantly running on higher frequences and eating power.

### Solution
For some reason I couldn't make it work with either `acpi_cpufreq` or `amd_pstate`, but [CoreFreq](https://github.com/cyring/CoreFreq) turned out to be a perfect solution once again.

Assuming that you already have it installed and working (otherwise check [[this guide|Guides/Hardware-Monitoring]] first):

```bash
# /etc/kernel/cmdline
... initcall_blacklist=acpi_cpufreq_init nmi_watchdog=0 idle=halt amd_pstate=disable tsc=unstable nowatchdog
```

```bash
# /etc/modprobe.d/blacklist.conf
k10temp
acpi_cpufreq
```

```bash
# /etc/modprobe.d/corefreqk.conf
options corefreqk Register_ClockSource=1 Register_CPU_Freq=1 Register_Governor=1 Register_CPU_Idle=1 Override_SubCstate="1,1,1,1,1,1,0,0"
```

Don't forget to do `update-initramfs -u -k all` after changing kernel's cmdline.
