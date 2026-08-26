# External GPU

[[Sixunited's board|Hardware/Boards/Sixunited_AXB35]] that most of the Chinese PCs use doesn't have an included Oculink port, so typically you will be limited to a USB4 connection only.

There is an option to add an Oculink port by sacrificing one NVMe slot and using M.2 to Oculink adapter. It was reported that these adapters could be problematic, so your mileage may vary. The one marked with `M2OC-3` seems to be the best one so far, you can look it up on AliExpress, [here's one listing for example](https://www.aliexpress.com/item/1005007551135681.html). You should be able to get a stable PCIe Gen 4 x4 connection as a result.

Here's an example of how Oculink could be integrated to [[EVO-X2|Hardware/PCs/GMKtec_EVO-X2]] (mod by Gipofaralcus):  
[![](./External_GPU/x2-oculink-mod-by-gipofaralcus.jpg?thumbnail=200)](./External_GPU/x2-oculink-mod-by-gipofaralcus.jpg)

[[FEVM's PC|Hardware/PCs/FEVM_FA-EX9]] has Oculink adapter included from the factory.

### AMD GPUs
There seems to be a problem with external GPU power limit which for some reason is being tied to the APU's power limit, so even if you connect a GPU that can draw much more power, it will still be limited to the APU limit you set in the BIOS.

Reports about this issue:
 - https://www.reddit.com/r/GMKtec/comments/1li7q0c/evox2why_is_there_a_120w_power_limit_when/
 - https://community.frame.work/t/request-verify-dgpu-support/69392

### NVIDIA GPUs
No problems were reported with NVIDIA GPUs.
