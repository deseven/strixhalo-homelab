# Lemonade + Open WebUI

## Overview
**Lemonade + Open WebUI** provides a streamlined, private AI stack tailored for your **Strix Halo** home lab. 

Rather than relying on a single monolithic engine, **[Lemonade](https://github.com/lemonade-sdk/lemonade)** acts as a unified inference server that orchestrates multiple high-performance backends ("recipes"). It abstracts the complexity of running distinct acceleration stacks (routing LLM tasks to the appropriate hardware) and handling image/audio generation via optimized C++ implementations, all served through a standard API compatible with Open WebUI.

**[Open WebUI](https://docs.openwebui.com/)** provides the frontend interface, offering a multi-user, mobile-responsive chat experience that integrates text, image generation, and voice interaction into a single UI. 

## Strix Halo Optimization
Lemonade is particularly potent for Strix Halo APUs as it exposes specific recipes to target the specialized hardware blocks available on Strix Halos.

Lemonade's supported configurations are available [here](https://github.com/lemonade-sdk/lemonade?tab=readme-ov-file#supported-configurations).

## Integration Features
*   **Unified API Surface:** Lemonade exposes these diverse backends via standard **OpenAI** and **Ollama** compatible endpoints on a single port.
*   **Native Model Management:** By connecting Open WebUI to Lemonade's Ollama API endpoint, users can browse, pull, and delete models directly from the web interface.
*   **Hardware Telemetry:** The stack supports the **[Lemonade Control Panel](https://openwebui.com/posts/lemonade_control_panel_a5ee89f2)** plugin, allowing users to verify NPU/GPU utilization and monitor token throughput directly within the chat window.

## Setup Guide
For a comprehensive guide on deploying this stack via Docker, configuring LAN access for house-wide use, and setting up the telemetry dashboard, refer to:

**[In-Depth Guide: Building a Unified Private AI Stack (Text, Images, and Voice)](https://sawansri.com/blog/private-ai/)**
