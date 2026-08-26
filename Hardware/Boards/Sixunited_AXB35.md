# Sixunited AXB35
One of the first Strix Halo boards, used in many Chinese PCs along with a cooling system. First revisions go back to at least October of 2024 (marked `SU_AXB35_FB11`).

**Known PCs:**
 - [GMKtec EVO-X2](../PCs/GMKtec_EVO-X2.md) (V21 & V22)
 - [Bosgame M5](../PCs/Bosgame_M5.md)
 - [FEVM FA-EX9](../PCs/FEVM_FA-EX9.md) (V22 & V30)
 - [NIMO AI MiniPC](../PCs/NIMO_AI_MiniPC.md)

Custom cases for printing/machining:
- https://www.printables.com/model/1765345-cool-quiet-case-for-ryzen-ai-max-395-sixunited-axb/files
- https://makerworld.com/en/models/2448273-bosgame-m5-silent-pc-case-80mm-fans

### Power
The board supports 3 different power limits - 55W (100W burst), 85W (120W burst), and 120W (140W burst):
![AXB35 Power Modes](./Sixunited_AXB35/axb35-power-modes.png)

See [the guide on power and performance](../../Guides/Power_Modes_and_Performance.md) for more info on power modes.

Idle power draw from the wall should be around 12W with two SSDs installed.

### Cooling
The cooling system is decent enough for this form factor, but could suffer from inadequate thermal interface conductivity. So if you plan to use a full 120W power limit, switching to PTM7950 or similar products is highly recommended. You'll need a 30x30 mm piece of 0.2-0.25 mm thickness.

Here's what you could expect from a correctly working system with PTM7950 (ambient temp +25°C, bios version 1.05):  
![](./Sixunited_AXB35/axb35-ptm7950-cooling.png)

A guide for applying it on EVO-X2 is available [here](../../Guides/Sixunited_AXB35/Replacing_Thermal_Interfaces_On_GMKtec_EVO-X2.md).

For fan and power mode control on Windows and Linux check out [this guide](../../Guides/Sixunited_AXB35/Power_Mode_and_Fan_Control.md).

### Facts
- RAM modules: [MT62F4G32D8DV-023](https://www.micron.com/products/memory/dram-components/lpddr5x/part-catalog/part-detail/mt62f4g32d8dv-023-wt-c)
- EC: ITE IT5570E-128
- PCB dimensions: 180x180x1.7 mm
- Heatsink mount: 75x75 mm (LGA 1700)
- Spacing between front/back screws: 165 mm
- Spacing between left/right screws: 170 mm
- RAM thermal pads thickness: 0.5 mm
- Power input: 19.5V, 5.5x2.5mm barrel jack, center positive

### Firmware
See [Firmware](./Sixunited_AXB35/Firmware.md) page.

### Photos

| Photo | Description |
| -------- | -------- |
| [![SU_AXB35-02-v21](./Sixunited_AXB35/axb35-02.jpeg?thumbnail)](./Sixunited_AXB35/axb35-02.jpeg) | AXB35-02 V21 from GMKtec EVO-X2 |
| [![SU_AXB35-02-v22 front](./Sixunited_AXB35/axb35-02-v22.jpeg?thumbnail)](./Sixunited_AXB35/axb35-02-v22.jpeg) [![SU_AXB35-02-v22 back](./Sixunited_AXB35/axb35-02-v22-back.jpeg?thumbnail)](./Sixunited_AXB35/axb35-02-v22-back.jpeg) | AXB35-02 V22 from more recent GMKtec EVO-X2 |
| [![SU_AXB35-02-v22](./Sixunited_AXB35/fa-ex9-board-mark.jpg?thumbnail)](./Sixunited_AXB35/fa-ex9-board-mark.jpg) | AXB35-02 V22 in FEVM FA-EX9 |
| [![SU_AXB35-02-v30](./Sixunited_AXB35/axb35-02-v30.jpeg?thumbnail)](./Sixunited_AXB35/axb35-02-v30.jpeg) | AXB35-02 V30 in FEVM FA-EX9 |
| [![SU_AXB35](./Sixunited_AXB35/axb35_board_with_cooling.jpg?thumbnail)](./Sixunited_AXB35/axb35_board_with_cooling.jpg) | Earlier revision of the board with the cooling system |

### Relevant Pages
 - [Firmware](./Sixunited_AXB35/Firmware.md)
 - [Sixunited_AXB35](../../Guides/Sixunited_AXB35)
