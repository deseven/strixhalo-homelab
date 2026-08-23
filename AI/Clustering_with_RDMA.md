# Clustering with RDMA

With RDMA and low latencies like 1µs, tensor parallelism can provide a speedup. 

You can use the USB4/Thunderbolt 3 ports of your Strix Halo to do some soft-RDMA. Check out [this repo](https://github.com/AlexKGwyn/ds4-vllm) to run DeepSeek V4 Flash that way.

If you're willing to invest in some extra hardware, you will get even lower latency than that and thus better performance. What's needed are network adapters that can offload the CPU for this task, connected via PCIe. There are two options, RoCe and Infiniband. Infiniband gives slightly lower latency, so that's what I'll be talking about here.

## Clustering with Oculink and PCIe 3.0 Infiniband cards

The two Bosgame M5 PCs used for this setup have neither an Oculink port nor a PCIe slot. So we use M.2 to Oculink adapters to get PCIe 4.0 x4 for the NICs. Here's some hardware used for a setup with cheap used Mellanox cards. The more recent PCIe 4.0 cards are quite a bit more expensive than the older cards. The PCIe 3.0 x4 connection limits the cards to speeds of around 26GBit/s. Not too shabby.

* 2× Strix Halo with a spare M.2 slot (tested using Bosgame M5)
* 1× ATX PC PSU (any will do, needs just 20 Watts). Me: PicoPSU, used, 20€.
* 2× Mellanox ConnectX-3 CX354A PCIe 3.0 x8 infiniband cards, used, 23€ each.
* 1× DAC cable Mellanox 56G QSFP+ FDR InfiniBand DAC Copper Twinax Passiv 0.5m MC2207130-00A, used, 18€ [example link](https://www.ebay.de/itm/126922287689)
* 1× ATX PSU 24pin splitter cable [example link](https://a.aliexpress.com/_Ezm7My8) ($6 with coins)
* 2× Oculink M.2 adapter, cable, PCIe 4.0 x16 slot [example link](https://a.aliexpress.com/_Ez9CgPK) (~$25 each with coins and coupons)
 
Total cost: 20€+2×23€+18€+49€ = 133€ Not bad!

What else is needed:

* a little 3d printed custom case for the two network cards
* 2× 3d printed lids for the SSD compartment with a hole for the Oculink cable. Or you drill a hole in the original metal lids.
* a little fan to keep the Mellanox cards cool inside the case (they use up to 10W each)

### Quick howto:

1. Connect Oculink M.2 adapters to the empty M.2 NVMe slots (1 per PC).
2. Plug Oculink cables into M.2 adapters and into PCIe 4.0 x16 slot adapters.
3. Plug 24pin PSU split cable into both PCIe 4.0 x16 slot adapters and into PSU.
4. Plug the two Mellanox cards into the PCIe slots
5. Connect the two Mellanox cards with the DAC cable
6. Using the switch on the PCIe 4.0 x16 slot adapter, turn on the PSU.
7. Finally, turn on the PCs.

Check if you can see the Mellanox cards in `lspci`:

```$ lspci
…
c3:00.0 Network controller: Mellanox Technologies MT27500 Family [ConnectX-3]
…
```
Make sure the NIC is connected via PCIe 3.0 x4:
```$ sudo lspci -vv -s c3:00.0 |grep -E "LnkCap:|LnkSta:"
		LnkCap:	Port #8, Speed 8GT/s, Width x8, ASPM L0s, Exit Latency L0s unlimited
		LnkSta:	Speed 8GT/s, Width x4 (downgraded)
```
It should also appear in your dmesg, like this:
```$ sudo dmesg |grep mlx4
[    2.762576] mlx4_core: Mellanox ConnectX core driver v4.0-0
[    2.762587] mlx4_core: Initializing 0000:c3:00.0
[    2.762633] mlx4_core 0000:c3:00.0: enabling device (0000 -> 0002)
[    9.162204] mlx4_core 0000:c3:00.0: DMFS high rate steer mode is: disabled performance optimized steering
[    9.162913] mlx4_core 0000:c3:00.0: 31.504 Gb/s available PCIe bandwidth, limited by 8.0 GT/s PCIe x4 link at 0000:00:02.5 (capable of 63.008 Gb/s with 8.0 GT/s PCIe x8 link)
[    9.402996] <mlx4_ib> mlx4_ib_probe: mlx4_ib: Mellanox ConnectX InfiniBand driver v4.0-0
[    9.404284] <mlx4_ib> mlx4_ib_probe: counter index 0 for port 1 allocated 0
[    9.404286] <mlx4_ib> mlx4_ib_probe: counter index 1 for port 2 allocated 0
[   10.781441] mlx4_core 0000:c3:00.0 ibp195s0: renamed from ib0
[   10.781830] mlx4_core 0000:c3:00.0 ibp195s0d1: renamed from ib1
[   12.486493] mlx4_core 0000:c3:00.0 ibp195s0d1: "NetworkManager" wants to know my dev_id. Should it look at dev_port instead? See Documentation/ABI/testing/sysfs-class-net for more info.
[ 1943.886040] mlx4_core 0000:c3:00.0 ibp195s0: Port: 1 Link INIT
[ 1943.941515] mlx4_core 0000:c3:00.0 ibp195s0: Port: 1 Link ACTIVE
```
<!-- this is problematic 
To enable performance optimized steering (and surrender VLAN support), edit 
`/etc/modprobe.d/mlx4.conf` and add this line:
```options mlx4_core log_num_mgm_entry_size=-7
```
as mentioned in the [driver documentation](https://doc.dpdk.org/guides/nics/mlx4.html). -->

Install needed packages on both PCs running Fedora 43:
```$ sudo dnf install rdma-core libibverbs-utils mstflint infiniband-diags perftest
$ ibv_devinfo
```
look for "Link Layer", it should show Infiniband

On PC1 we start **opensm**, the Infiniband subnet manager and administration:
```$ sudo dnf install opensm
$ sudo systemctl enable --now opensm
$ sudo restorecon -v /var/log/opensm.log

$ ibstat
```
now shows „State: Active“ on both PCs

PC1:
```$ ip a|grep -B 1 infini
4: ibp195s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 2044 qdisc fq_codel state UP group default qlen 1000
    link/infiniband 80:00:02:08:fe:80:00:00:00:00:00:00:ec:0d:9a:03:00:xx:xx:xx brd 00:ff:ff:ff:ff:12:40:1b:ff:ff:00:00:00:00:00:00:ff:ff:ff:ff
5: ibp195s0d1: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 4092 qdisc fq_codel state DOWN group default qlen 1000
    link/infiniband 80:00:02:09:fe:80:00:00:00:00:00:00:ec:0d:9a:03:00:xx:xx:xx brd 00:ff:ff:ff:ff:12:40:1b:ff:ff:00:00:00:00:00:00:ff:ff:ff:ff
```
PC2:
```$ ip a|grep -B 1 infini
3: ibp195s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 2044 qdisc fq_codel state UP group default qlen 1000
    link/infiniband 80:00:02:08:fe:80:00:00:00:00:00:00:ec:0d:9a:03:00:yy:yy:yy brd 00:ff:ff:ff:ff:12:40:1b:ff:ff:00:00:00:00:00:00:ff:ff:ff:ff
4: ibp195s0d1: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 4092 qdisc fq_codel state DOWN group default qlen 1000
    link/infiniband 80:00:02:09:fe:80:00:00:00:00:00:00:ec:0d:9a:03:00:yy:yy:yy brd 00:ff:ff:ff:ff:12:40:1b:ff:ff:00:00:00:00:00:00:ff:ff:ff:ff
```
So the interface name is **ibp195s0** on both PCs.

configure IPv4 on PC1:
```$ sudo nmcli conn add type infiniband con-name ib-conn ifname ibp195s0 transport-mode datagram ipv4.method manual ipv4.addresses 192.168.100.1/24
Verbindung »ib-conn« (e6655fba-ebd6-4ee5-a31b-9c25faacfe37) erfolgreich hinzugefügt.
```
configure IPv4 on PC2:
```$ sudo nmcli conn add type infiniband con-name ib-conn ifname ibp195s0 transport-mode datagram ipv4.method manual ipv4.addresses 192.168.100.2/24
$ sudo nmcli conn up ib-conn
$ sudo nmcli conn show
```
PC1: (I also have a connection via Thunderbolt)
```$ sudo nmcli conn up ib-conn
$ sudo nmcli conn show
NAME                         UUID                                  TYPE        DEVICE       
Kabelgebundene Verbindung 1  1a44c330-8d06-34d6-9773-df0a34882a4b  ethernet    eno1         
ib-conn                      e6655fba-ebd6-4ee5-a31b-9c25faacfe37  infiniband  ibp195s0     
thunderbolt0                 7beaa789-b367-4810-ba22-3e946edab0fd  ethernet    thunderbolt0 
```
PC2:
```$ sudo nmcli conn show
NAME                         UUID                                  TYPE        DEVICE       
Kabelgebundene Verbindung 1  dea9361f-0f51-3acf-9b85-04a35c116b67  ethernet    eno1         
ib-conn                      5eaa86fe-99e7-48c9-b460-740d31adc936  infiniband  ibp195s0     
thunderbolt0                 bd7e1a3c-f05d-3a43-bfc0-880fb874dba4  ethernet    thunderbolt0 
```
Check with "ip a" if the infiniband interfaces are up. If not, check on PC1 if opensm is giving errors?

OK, if the connection is up, we can check the bandwidth:

On PC1:
```$ ib_write_bw
```
On PC2:
```$ ib_write_bw 192.168.100.1
#bytes     #iterations    BW peak[MiB/sec]    BW average[MiB/sec]   MsgRate[Mpps]
 65536      5000             3293.63            3293.56             0.052697
```
and we can check the latency:

On PC1:
```$ ib_write_lat
```
On PC2:
```$ ib_write_lat 192.168.100.1
 #bytes #iterations    t_min[usec]    t_max[usec]  t_typical[usec]    t_avg[usec]    t_stdev[usec]   99% percentile[usec]   99.9% percentile[usec] 
 2       1000          1.10           2.05         1.11     	       1.12        	0.00   		1.19    		2.05   
```
So around 1.12µs which is an expected value. Great!

Verify link:
```
$ rdma link
link ibp195s0/1 subnet_prefix fe80:0000:0000:0000 lid 2 sm_lid 1 lmc 0 state ACTIVE physical_state LINK_UP netdev ibp195s0 
link ibp195s0/2 subnet_prefix fe80:0000:0000:0000 lid 0 sm_lid 0 lmc 0 state DOWN physical_state POLLING netdev ibp195s0d1 
```

Next, you can either 
- follow the [AMD Strix Halo RDMA Cluster Setup Guide](https://github.com/kyuz0/amd-strix-halo-vllm-toolboxes/blob/main/rdma_cluster/setup_guide.md) starting at Step 4.4. or

- check out [this repo](https://github.com/neuhaus/ds4-vllm/tree/feature/infiniband-mlx4) for vLLM in a container with tensor parallelism and DSpark serving DeepSeek V4 Flash-0731 with 512k context. Thanks to [vLLM](https://vllm.ai), [kyuz0](https://github.com/kyuz0/amd-strix-halo-vllm-toolboxes) and [AlexKGwyn](https://github.com/AlexKGwyn/ds4-vllm) for making it possible.

To be continued, it's still work in progress.
