# Sixunited AXB35 Firmware

### BIOS & EC Upgrade

:::danger
**DO NOT FLASH ANY FIRMWARE IF YOUR SYSTEM IS STABLE AND FUNCTIONING PROPERLY**, only consider a BIOS update if you have specific technical requirements or are experiencing any issues
:::

All devices sent after the middle of May seem to have BIOS version of at least 1.04. The only officially supported upgrade way is using Windows, follow the included instructions. Something like [Hiren's BootCD](https://www.hirensbootcd.org) could be used as a more convenient option. If there's only ROM file available, download any other BIOS pack in zip archive, which has a flashing utility included. Note that **you're supposed to update EC firmware first and BIOS the last.**

> [!CAUTION]
> After initiating the BIOS upgrade, your PC will reboot and the process will continue in a special interface.  
> - ‼️ **DO NOT turn off your computer or interrupt power**  
> - ‼️ **DO NOT press any keys during this process**  
> - ‼️ **BE PATIENT, the screen may remain blank for several minutes**  
> In case you somehow managed to brick your system, the only way of restoring it yourself would be **direct ROM chip flashing using a programmer**, [described in this guide](../../../Guides/Sixunited_AXB35/Restoring_Corrupted_BIOS.md).


### Compatibility

All AXB35 firmwares should be compatible across AXB35-based devices, allowing you to flash any OEM BIOS regardless of the original manufacturer. However, **proceed at your own risk** as this practice is not officially supported. Technically it shouldn't even be possible to flash incompatible firmware because it should have a different ROM ID. Currently, **we have several confirmed successful cases of flashing GMK BIOS onto a FEVM and Bosgame PCs without any issues**.

In general, **GMK's BIOS is considered to be the best one so far** (while still being very limited).


### Debug Mode

A debug mode can be toggled by pressing **ALT+F5**, saving changes and rebooting. Enabling the mode adds a second "Advanced" tab that contains a lot of additional options, as well as some additional settings in the existing tabs. However, some of them are glitchy or don't work at all. In some cases changing these can even lead to your system not booting unless you erase your settings by removing the battery. All in all, it's not recommended to mess with the debug mode without a particular reason.


### Firmware Versions

:::info
If you happen to have BIOS or EC firmware versions not presented on this page and would like to share, please **[contact me directly](https://d7.wtf/contact)** or **[join our Discord](https://discord.gg/pnPRyucNrG)**
:::

Firmware marked with ✅ is proven to be stable and could be recommended for using.

>|# Bosgame M5
>|
>|**BIOS**
>|
>|| Version  | Official Changelog | Notes | Download |
>|| -------- | ------------------ | ----- | -------- |
>|| **1.09 20260508** | N/A | Got from Bosgame support, `PCBV2.0X` mentioned in the filename doesn't seem to be important, the BIOS works even on the earliest revisions of the board. | [AXB35-02_BOSGAME_SW1.09_PCBV2.0X_20260508.zip](./Firmware/AXB35-02_BOSGAME_SW1.09_PCBV2.0X_20260508.zip) |
>|| **1.07 20250912** | N/A | This BIOS was dumped from a unit bought in October 2025. | [AXB35-02_BOSGAME_SW1.07_20250912.rom](./Firmware/AXB35-02_BOSGAME_SW1.07_20250912.rom) |
>|
>|**EC Firmware**
>|
>|| Version  | Official Changelog | Notes | Download |
>|| -------- | ------------------ | ----- | -------- |
>|| **1.06** | N/A | N/A | [EC-AXB35-02-1.06-BG.zip](./Firmware/EC-AXB35-02-1.06-BG.zip) |

>|# Corsair AI Workstation 300
>|
>|The latest BIOS is available [on the product page in the Downloads section](https://www.corsair.com/us/en/p/gaming-computers/cs-9080002-na/corsair-ai-workstation-300-amd-ryzen-ai-max-395-processor-amd-radeon-8060s-igpu-up-to-96gb-vram-128gb-lpddr5x-memory-1tb-m2-ssd-win11-home-cs-9080002-na#tab-downloads).

>|# FEVM FA-EX9
>|
>|**BIOS**
>|
>|| Version  | Official Changelog | Notes | Download |
>|| -------- | ------------------ | ----- | -------- |
>|| **3.03** | N/A | This BIOS was dumped from a unit. | [AXB35-02_FEVM_SW3.03.rom](./Firmware/AXB35-02_FEVM_SW3.03.rom) |

>|# GMKtec EVO-X2
>|
>|BIOS and EC firmware are no longer available [on the GMKtec website](https://www.gmktec.com/pages/drivers-and-software), but you can download previously saved copies here.
>|
>|**BIOS**
>|
>|| Version  | Official Changelog | Notes    | Download |
>|| -------- | ------------------ | -------- | -------- |
>|| **1.12 20251209** | 1. Update the fan adjustment mode, changing from fan percentage to fan duty cycle adjustment<br>2. Optimize the phenomenon where the "O" key cannot be inputted under BIOS | Community found changes:<br>1. Custom curves are indeed there, but pretty limited.<br>2. <span style="color:red">The `O` problem was not fixed.</span><br>3. Minimum VRAM allocation is now 2GB.<br>4. Secure Boot gets disabled after flashing. | [AXB35-02_GMK_SW1.12_20251209.zip](./Firmware/AXB35-02_GMK_SW1.12_20251209.zip) |
>|| **1.11 20251017** | N/A | Suddenly appeared on the GMK's Google Drive. Community found changes:<br>1. <span style="color:red">It's no longer possible to use the `O` key in the BIOS and on the boot level</span> (workaround: toggle Num Lock).<br>2. Minimum VRAM allocation is now 1GB, not 512MB. | [AXB35-02_GMK_SW1.11_20251017.zip](./Firmware/AXB35-02_GMK_SW1.11_20251017.zip) |
>|| ✅ **1.05 20250729** | N/A | Suddenly appeared on the GMK's Google Drive. GMK's support said this is a final version of the previous **20250716** fix. | [AXB35-02_GMK_SW1.05_20250729.zip](./Firmware/AXB35-02_GMK_SW1.05_20250729.zip) |
>|| **1.05 20250716** | Solve the problem of SD card reverse locking | Suddenly appeared on the GMK's Google Drive. | [AXB35-02_GMK_SW1.05_20250716.zip](./Firmware/AXB35-02_GMK_SW1.05_20250716.zip) |
>|| ✅ **1.05 20250606** | N/A | According to Sixunited this one contains many changes from upstream and the rest is confidential. I personally noticed more conservative voltages and slightly improved temperature because of that. | [AXB35-02_GMK_SW1.05_20250606.zip](./Firmware/AXB35-02_GMK_SW1.05_20250606.zip) |
>|| **1.04** | 1. Add virtualization<br>2. The first startup item is displayed as USB<br>3. The Core Performance Boost function is hidden<br>4. Add GFX Configuration in the BIOS to adjust the video memory<br>5. The BIOS adds a fan adjustment menu<br>6. Configure the BIOS at 64G/128G for automatic compatibility recognition | N/A | [AXB35-02_GMK_SW1.04_20250514.zip](./Firmware/AXB35-02_GMK_SW1.04_20250514.zip) |
>|
>|**EC Firmware**
>|
>|| Version  | Official Changelog | Notes | Download |
>|| -------- | ------------------ | ----- | -------- |
>|| **1.10** | Added custom fan curves. | N/A | [EC-AXB35-02-1.10-GMK-A.zip](./Firmware/EC-AXB35-02-1.10-GMK-A.zip) |
>|| ✅ **1.08** | N/A | No noticeable changes. | [EC-AXB35-02-1.08.zip](./Firmware/EC-AXB35-02-1.08.zip) |
>|| ✅ **1.06** | N/A | Seems to have slightly quieter fan curves. | [EC-AXB35-02-1.06.zip](./Firmware/EC-AXB35-02-1.06.zip) |
>|| ✅ **1.04** | N/A | First version that supports manual fan control. | [EC-AXB35-02-1.04.zip](./Firmware/EC-AXB35-02-1.04.zip) |

>|# Sixunited Generic (AIFUT, NIMO, etc)
>|
>|**BIOS**
>|
>|| Version  | Official Changelog | Notes | Download |
>|| -------- | ------------------ | ----- | -------- |
>|| **1.06 20250620** | N/A | This BIOS was dumped from AIFUT unit. | [AXB35-02_SIXUNITED_SW1.06_20250620.rom](./Firmware/AXB35-02_SIXUNITED_SW1.06_20250620.rom) |
>|| **3.04 20250819** | N/A | This BIOS was provided by Sixunited support. | [AXB35-02_SIXUNITED_SW3.04_20250819.zip](./Firmware/AXB35-02_SIXUNITED_SW3.04_20250819.zip) |


### Relevant Pages
 - [Sixunited_AXB35](../Sixunited_AXB35.md)
 - [GMKtec_EVO-X2](../../PCs/GMKtec_EVO-X2.md)
 - [Restoring_Corrupted_BIOS](../../../Guides/Sixunited_AXB35/Restoring_Corrupted_BIOS.md)
