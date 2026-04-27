# Sixunited AXB35
One of the first Strix Halo boards, used in many Chinese PCs along with a cooling system. First revisions go back to at least October of 2024 (marked `SU_AXB35_FB11`).

**Known PCs:**
 - [[GMKtec EVO-X2|Hardware/PCs/GMKtec_EVO-X2]] (V21 & V22)
 - [[Bosgame M5|Hardware/PCs/Bosgame_M5]]
 - [[FEVM FA-EX9|Hardware/PCs/FEVM_FA-EX9]] (V22 & V30)
 - [[NIMO AI MiniPC|Hardware/PCs/NIMO_AI_MiniPC]]

There's also at least one [custom case available for printing](https://makerworld.com/en/models/2448273-bosgame-m5-silent-pc-case-80mm-fans), along with a 3D scan of the full board.

### Power
The board supports 3 different power limits - 55W (100W burst), 85W (120W burst), and 120W (140W burst):
![AXB35 Power Modes](./axb35-power-modes.png)

See [[the guide on power and performance|Guides/Power_Modes_and_Performance]] for more info on power modes.

Idle power draw from the wall should be around 12W with two SSDs installed.

### Cooling
The cooling system is decent enough for this form factor, but could suffer from inadequate thermal interface conductivity. So if you plan to use a full 120W power limit, switching to PTM7950 or similar products is highly recommended. You'll need a 30x30 mm piece of 0.2-0.25 mm thickness.

Here's what you could expect from a correctly working system with PTM7950 (ambient temp +25°C, bios version 1.05):  
![](./axb35-ptm7950-cooling.png)

A guide for applying it on EVO-X2 is available [[here|Guides/Sixunited_AXB35/Replacing_Thermal_Interfaces_On_GMKtec_EVO-X2]].

For fan and power mode control on Windows and Linux check out [[this guide|Guides/Sixunited_AXB35/Power_Mode_and_Fan_Control]].

### Facts
 - RAM modules: [MT62F4G32D8DV-023](https://www.micron.com/products/memory/dram-components/lpddr5x/part-catalog/part-detail/mt62f4g32d8dv-023-wt-c)
 - EC: ITE IT5570E-128
 - Heatsink mount: 75x75 mm (LGA 1700)
 - RAM thermal pads thickness: 0.5 mm
 - Power input: 19.5V, 5.5x2.5mm barrel jack, center positive

### Firmware
See [[Firmware|Hardware/Boards/Sixunited_AXB35/Firmware]] page.

### Photos

| Photo | Description |
| -------- | -------- |
| [![SU_AXB35-02-v21](./axb35-02.jpeg?thumbnail)](./axb35-02.jpeg) | AXB35-02 V21 from GMKtec EVO-X2 |
| [![SU_AXB35-02-v22 front](./axb35-02-v22.jpeg?thumbnail)](./axb35-02-v22.jpeg) [![SU_AXB35-02-v22 back](./axb35-02-v22-back.jpeg?thumbnail)](./axb35-02-v22-back.jpeg) | AXB35-02 V22 from more recent GMKtec EVO-X2 |
| [![SU_AXB35-02-v22](./fa-ex9-board-mark.jpg?thumbnail)](./fa-ex9-board-mark.jpg) | AXB35-02 V22 in FEVM FA-EX9 |
| [![SU_AXB35-02-v30](./axb35-02-v30.jpeg?thumbnail)](./axb35-02-v30.jpeg) | AXB35-02 V30 in FEVM FA-EX9 |
| [![SU_AXB35](./axb35_board_with_cooling.jpg?thumbnail)](./axb35_board_with_cooling.jpg) | Earlier revision of the board with the cooling system |

### Relevant Pages
 - [[Hardware/Boards/Sixunited_AXB35/Firmware]]
 - [[Guides/Sixunited_AXB35]]
