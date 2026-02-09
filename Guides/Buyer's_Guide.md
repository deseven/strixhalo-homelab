# Strix Halo Buyer's Guide

This guide is written based on my own experience and experiences of other people, as well as [the data from the owner's questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSdckAFgHfRF7pt8-HXf9xCFCqkbg8uo9ZHBhGg78lDmcVtj-A/viewanalytics). It's in no way complete and is a subject of further improvements.


## Do I Even Need It?

#### AI Stuff

One of Strix Halo's main selling points is its 128GB of unified memory. This makes it able to run some bigger AI models, and it can be one of the best price/performance ways to do that, with some important caveats. While it has plenty of memory accessible to a relatively capable GPU, the memory bandwidth is relatively low (256 GB/s), which means that while large MoE (Mixture of Expert) LLMs like `gpt-oss-120b` can run well, large dense models will run extremely slowly. From a compute and memory bandwidth perspective, if a model fits entirely in VRAM, then even relatively low-end GPUs (eg, an RTX 3060) will outperform Strix Halo.

Context size is also something to keep in mind: **prompt processing and text generation speeds take a major hit as context grows**. This is true for all hardware, but Strix Halo takes a worse relative hit vs NVIDIA GPUs. Depending on model size and architecture, going over 64k, 32k, and in some cases even 16k of context can mean very long waits, and much slower performance. If you are having chat conversations and the prior context is cached, then you may not be as heavily impacted, but for agentic or document processing use cases, you will need to run these non-interactively (or expect long waits).

Here is an example of the performance drop that happens as context size grows:  
![](./strix-halo-pp-tg-ctx.png)

**General rule: look at benchmarks with the specific model and context size you're interested in.** The [[AI section|AI/AI_Capabilities_Overview]] of our wiki has links to some community-generated benchmarks, but if you can't find your specific model, ask in [our Discord](https://discord.gg/pnPRyucNrG) for someone to test it for you. This is important - don't give in to hype only to be disappointed later.

So far, we've just been talking about text models, which Strix Halo handles relatively well, but it's important to note that **image and video generation is just slow** (and sometimes entirely broken!). Most pipelines are optimized for CUDA, and while AMD (ROCm, Vulkan) support has been getting better, software support and optimization is still a big issue. 

This last point is more generally true as well. Despite having launched in early 2025, and despite being advertised as an "AI" system, AMD's software support is still relatively lacking. ROCm (AMD's CUDA equivalent) support is still relatively slow and unoptimized for Strix Halo, and basic AI support like PyTorch, vLLM, Flash Attention have sharp edges or may not work at all! The Strix Halo NPUs are also largely unused (and in Linux, basically unusable) and while there have been some great community efforts, sadly the community has also been often left to "fend for themselves" both when it comes to official first-party (AMD) or third party support. While things are improving, if you want something that "just works" for AI you may be better off paying the NVIDIA tax.

#### Non-AI Stuff

What about other, non-AI related tasks? Well, it's great! If we're talking about the top-of-the-line AI Max+ 395, in terms of raw CPU performance it could even be compared to the Ryzen 9 9950X (being roughly just 5% slower), which is really impressive. The iGPU is also the best one available on the market so far. Depending on the power limit, the 8060S performance lies somewhere between desktop versions of RTX 3060 and 4060, leaning closer to the latter and in some cases even beating it.

All of that, along with a huge amount of RAM, also makes the platform very interesting for running VMs and acting as a home server. However, note that [[GPU passthrough|Guides/VM_iGPU_Passthrough]] on consumer AMD cards is very lacking and plagued with problems.

#### All at Once

With that said, my personal opinion about the best use case is basically a kind of "jack of all trades" system. You get full x86 compatibility and something that can do anything and everything, albeit not at the highest possible levels and while being kinda pricey (especially with prices rising since November 2025).

## Choosing the Right Configuration

There are four main types of Strix Halo-based devices: mini PCs, AIOs, laptops, and handhelds. Laptops and handhelds are typically power and cooling limited, so their performance is generally lower. However, the difference between 55W and 120W power limits isn't that massive ([[5-35% depending on the task|Guides/Power_Modes_and_Performance]]). This guide is mostly centered on mini PCs since this seems to be the most popular option.

There are several different models of Strix Halo APUs available:  
![Strix Halo APU Specs](./strix-halo-specs.png)

Each APU comes with 32, 64, 96, or 128GB of onboard RAM that can be shared with the iGPU statically or dynamically. I'd personally recommend sticking to the best available option, which is the AI Max+ 395, but of course it's up to you and your preferred use case. Note that some manufacturers don't even provide options with lower-tier APUs.

The amount of RAM is another consideration. If you don't care about AI stuff, 32GB could be just enough, otherwise 64GB or higher is the way to go. **Important note**: None of the Strix Halo systems are upgradeable, so picking the beefiest option for both the APU and RAM amount is reasonable - and this is what most people do.


## What Mini PC to Buy

About 90% of Chinese PCs (GMKtec, Bosgame, FEVM, Corsair, NIMO, etc.) are built on the same [[platform made by Sixunited|Hardware/Boards/Sixunited_AXB35]]. It's nothing to write home about, but performance-wise (which I think is the most important thing) it will be roughly the same as anything else, so it's a valid option if you want to go the cheapest route. Things to look out for: import taxes, warranty, support (or the lack thereof). Also note that the BIOS on these systems is extremely limited and getting updates is an adventure in itself.

**When sourcing from Chinese manufacturers, consider purchasing through established marketplaces** like Amazon, AliExpress, Taobao, JD (depending on where you're located and what options are available) as these platforms typically offer stronger buyer protection policies, streamlined return processes, and dispute resolution mechanisms in case of defective products or shipping issues, which are not that uncommon in that case.

Based on the survey data, **[[GMKtec EVO-X2|Hardware/PCs/GMKtec_EVO-X2]]** and **[[Bosgame M5|Hardware/PCs/Bosgame_M5]]** seem to be the most popular Chinese options, with most buyers being satisfied with their purchases. GMKtec appears slightly more reliable, while some Bosgame units had minor issues like stuck power buttons.

**[[Corsair AI Workstation 300|Hardware/PCs/Corsair_AI_Workstation_300]]** is also a decent one. It's a stock Sixunited's PC, but brand reputation likely force them to have a better quality control and support. 

**[[Beelink GTR9Pro|Hardware/PCs/Beelink_GTR9_Pro]]** is an interesting Mac Mini-style system that suffered from significant stability issues unresolved for several months. Beelink eventually released an updated hardware revision and offered replacements. **Avoid unless you can confirm the motherboard is version 2.2 or later, or features Realtek NICs.**

**[[Minisforum MS-S1 MAX|Hardware/PCs/Minisforum_MS-S1_MAX]]** seems decent and also has a PCIe slot for expandability, along with two 10G Ethernets. Early feedback suggests good build quality and premium feel, however some people report problems with the network interfaces on Linux and sub-optimal fan curves, both problems could likely be fixed in software later.

**[[HP Z2 Mini G1a|Hardware/PCs/HP_Z2_Mini_G1a]]** is still the only option from big Western manufacturers. They claim there's an ECC memory option, but I've never seen anyone with actual ECC modules (only ECC-link). It boosts up to 160W (although going beyond 120W leads to very questionable gains) and is noisier than Sixunited's cooling, which is hard to imagine. Pricing is all over the place, if someone could find it for an adequate price (sub $2500), then it could be recommended because with HP you at least get some level of support. Also features the PRO version of the APU, with the only real difference being DASH support.

**[[Framework Desktop|Hardware/PCs/Framework_Desktop]]** is the crown jewel of them all - pretty good in all possible measurements, except for size. It can be recommended as a guaranteed plug-and-play device with decent support and a huge community. However, it's also a bit pricey and availability sucks. Some users experienced longer wait times (over a month), and there were occasional PSU fan noise issues.

You can also check out [the spreadsheet that aims to compare all possible options](https://docs.google.com/spreadsheets/d/1QOvILBE7BZHICVWJ1ylmlO3jIMig1HYW6gIeZ1jhQXE/edit?gid=0#gid=0) (could be a bit outdated).

## Size and Noise

To evaluate the case sizes, there is [a great infographic created by RexYuan](https://gist.github.com/RexYuan/3fc27edcd12475e496eb20946f8c8485):  
![Strix Halo PC Sizes](./strix-halo-pc-sizes.png)

Most Strix Halo mini PCs are considered noisy in general. The typical cooling solution for almost every PC except for the Framework's consists of two high-RPM blowers that create enough pressure to push sufficient air through the heatsink. On the full 120W power limit, it's almost guaranteed to be noisy no matter what you do. If you have a chance to put the PC in a separate room and only work with it remotely (SSH, RDP, streaming, etc), this might be ideal.


## DIY Way

It is possible to buy just the board and build your own PC with it, but you'll basically be limited to the [[Framework's one|Hardware/Boards/Framework_Desktop_Mainboard]]. There are other options from [[Sixunited|Hardware/Boards/Sixunited_STHT1]] and [[MeeGoPad|Hardware/Boards/MeeGoPad_100AM]], but they seem to be hard to get and no owners were encountered in the wild just yet. If anything could be concluded from the quality of descriptions and brand reputation - avoid.


## Country-Specific Information

**European Union**: Most buyers don't have to pay anything extra, since many Chinese manufacturers now ship from EU warehouses (particularly Germany) to avoid import duties. Delivery times are typically 1-2 weeks.

**United States**: Some products are available through local retailers like Microcenter. Framework and Corsair seem popular for those wanting better support.

**Canada**: Pricing tends to be slightly higher due to exchange rates and taxes.

**Asia-Pacific**: Pricing varies significantly by country. In Japan, domestic online shopping sites often offer better deals than direct manufacturer purchases. South Korea has notably high pricing due to import duties and local retailer markups, also for some bizarre reason PCs could lack WI-Fi modules. 

**China**: Obviously the cheapest option if you're local, no import taxes, no delays.


## Alternatives

For AI workloads, there are two obvious alternatives: **NVIDIA DGX Spark** and **Apple Silicon Macs**. Both would be pricier with the same amount of RAM, both are tied to their own ecosystems (not x86), but both could be more performant for AI use cases too. If AI is your main requirement and you don't care about x86 compatibility, I highly recommend researching these options before committing to anything.

For gaming and general tasks, you should be able to build a more performant system for less money, although it will likely take more space and draw more power. A traditional desktop with a mid to high-end dedicated GPU will almost always outperform Strix Halo in gaming scenarios.


## Conclusions

This might sound obvious, but really, **think before you buy!** Consider available options, read reviews, check out benchmarks, and ask current owners about their experiences. Figuring it all out might be a bit overwhelming, but there's really no way around it if you want to be happy about your purchase. 

The questionnaire data shows that most buyers (about 85%) are satisfied with their purchases, but satisfaction varies significantly by use case and expectations. Those focused purely on AI workloads tend to be less satisfied due to software ecosystem limitations, while those using these systems as general-purpose machines tend to be happier.

**Key takeaways:**
- Don't buy based on hype alone - verify performance with your specific use cases
- Chinese OEMs offer the best value but with limited support
- Framework/HP could cost more but provide better support and build quality  
- Factor in import duties and taxes for your specific location, read seller conditions
- Be prepared for noise and consider remote usage if possible
- Remember that nothing except for storage is upgradeable - buy the specs you need from day one

The Strix Halo platform is genuinely impressive from a technical standpoint, but it's not a magic bullet. Set realistic expectations and you'll likely be happy with what it can do.

Good luck!
