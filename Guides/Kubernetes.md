# Kubernetes
Running Kubernetes on a Strix Halo machine allows you to build a powerful node for local AI inference. Because standard Kubernetes GPU operators are designed for discrete PCIe cards, Strix Halo requires a few platform-specific tweaks to enable reliable GPU scheduling and monitoring.

This guide shows how to configure a Strix Halo system with Talos Linux, the ROCm GPU Operator, and custom Node Feature Discovery rules so Kubernetes workloads can access the iGPU cleanly.

By the end of this guide, you will have configured:

- Optimized Node Provisioning: A Talos Linux installation with the required AMD drivers and memory allocation kernel arguments.
- Native GPU Scheduling: A fully functional AMD ROCm GPU Operator that allows pods to request GPU resources (e.g., amd.com/gpu: 1).
- Reliable Hardware Discovery: Custom NFD rules tailored to detect the Strix Halo iGPU via kernel modules rather than traditional device IDs.
- Verified Acceleration: A successful PyTorch benchmark running on the GPU, complete with Prometheus metrics for monitoring VRAM and power usage.

## Talos

If you are planning to access your Strix Halo machine for AI workloads, I would recommend building a Talos image with this schematic:

```yaml
customization:
  extraKernelArgs:
    - amd_iommu=off
    - amdgpu.gttsize=126976
    - amdgpu.vm_fragment_size=8
    - ttm.pages_limit=32505856
    - ttm.page_pool_size=25165824
  systemExtensions:
    officialExtensions:
      - siderolabs/amd-ucode
      - siderolabs/amdgpu
      - siderolabs/thunderbolt  # Optional: for Framework USB-C/Thunderbolt support
```

It's necessary to have the AMD extensions to ensure you have proper drivers, but the kernel args are optional and depend on your workload type (AI vs general compute).

More info on how to build your container image with a custom schematic can be found [here](https://docs.siderolabs.com/talos/v1.10/learn-more/image-factory).

Once you boot up the system with these initial arguments, you should be able to access the Talos live interface. Here is a command to ensure the GPU is accessible:

```bash
# Check if AMD GPU kernel module is loaded
talosctl -n <node-ip> get kernelmodulestatus amdgpu
```

## ROCm GPU Operator

The AMD GPU operator gives you access the underlying Strix Halo hardware with resource requests/limits like so:

```yaml
resources:
  limits:
    amd.com/gpu: 1
```

To enable this, we first install the gpu operator. Then, we ensure nodes are properly labeled so that the gpu operator recognizes them. Finally, we can test a gpu workload on the Strix Halo node and confirm the gpu is accessible.

### Helm Installation

First, we need to install the ROCm GPU Operator:

```bash
# Add Helm repo
helm repo add rocm https://rocm.github.io/gpu-operator
helm repo update

# Install operator
helm install rocm-operator rocm/gpu-operator-charts \
  -f values.yaml --namespace amd --create-namespace
```

#### Helm values

Here are the key configuration options for the Helm chart:

```yaml
# Enable Kernel Module Management (KMM) for driver management
kmm:
  enabled: true

# Install default NFD rules
installdefaultNFDRule: true

# Device configuration
deviceConfig:
  spec:    
    # Driver settings - disable in-cluster driver since Talos manages it
    # Talos already includes the AMDGPU kernel module, so we don't need 
    # the operator to install drivers
    driver:
      enable: false
      blacklist: false
```

> **Note**: Disabling `driver.enable` is important for Talos deployments since Talos already includes the AMDGPU kernel module via the `siderolabs/amdgpu` extension. Setting this to `false` means the operator will use the pre-installed kernel module rather than trying to install drivers in-cluster.

### Node Feature Discovery

Node Feature Discovery (NFD) automatically detects hardware features and labels nodes. The ROCm GPU Operator uses these labels to identify GPU nodes. 

For Strix Halo machines, use this rule to detect the `amdgpu` kernel module:

```yaml
apiVersion: nfd.k8s-sigs.io/v1alpha1
kind: NodeFeatureRule
metadata:
  name: amdgpu-rules
spec:
  rules:
    - name: "amdgpu kernel module"
      labels:
        feature.node.kubernetes.io/amd-gpu: "true"
      matchFeatures:
        - feature: "kernel.loadedmodule"
          matchExpressions:
            amdgpu: {op: Exists}
```

```bash
# Apply rules
kubectl apply -f nfd-rule.yaml
```

This rule will automatically label any node with the `amdgpu` kernel module loaded with the label `feature.node.kubernetes.io/amd-gpu: "true"`.

> **Strix Halo Note**: This NFD rule checks for the `amdgpu` kernel module rather than device IDs, which works reliably with the Strix Halo iGPU where traditional device-based detection may fail.

### Post-installation Verification

Verify the operator is running and GPUs are detected:

```bash
# Check operator pods
kubectl get pods -n amd

# Verify GPU resources are allocatable
kubectl describe nodes | grep -E "(amd\.com/gpu|amd-gpu)"

# Confirm GPU labels are applied
kubectl get nodes --show-labels | grep amd-gpu
```

### PyTorch GPU Test

Once the operator is deployed, you can test GPU access with a PyTorch workload:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pytorch-gpu-demo
  namespace: amd
spec:
  template:
    spec:
      restartPolicy: OnFailure
      containers:
        - name: pytorch-gpu-container
          image: rocm/pytorch:latest
          command: ["/bin/bash", "-c", "--"]
          args:
            - |
              rocm-smi
              git clone https://github.com/ROCm/pytorch-micro-benchmarking.git
              cd pytorch-micro-benchmarking
              python micro_benchmarking_pytorch.py --network resnet50 --compile
          resources:
            limits:
              amd.com/gpu: 1
```

Save this as `pytorch-demo.yaml` and apply:

```bash
kubectl apply -f pytorch-demo.yaml
```

Monitor the job:
```bash
kubectl logs -n amd job/pytorch-gpu-demo -f
```

**Expected output**: You should see `rocm-smi` displaying your GPU information (GPU name, temperature, power usage, etc.), followed by benchmark results showing the ResNet50 training progressing with GPU acceleration. If successful, you'll see lines indicating "GPU is available" and training throughput metrics.

### Monitoring

The ROCm GPU Operator includes a metrics exporter that automatically exposes GPU metrics for Prometheus scraping. Add the following to your Helm values to enable monitoring:

```yaml
metricsExporter:
  enable: true
  prometheus:
    serviceMonitor:
      enable: true
      interval: 30s
```

When enabled, the exporter provides standard AMD GPU metrics including:
- GPU health status (`gpu_health`)
- VRAM usage (`gpu_used_vram`, `gpu_total_vram`)
- GTT (Graphics Translation Table) memory usage (`gpu_used_gtt`, `gpu_total_gtt`)
- GPU temperature and power consumption
- Per-container GPU memory allocation

These metrics can be visualized in Grafana using standard ROCm GPU dashboards. The Strix Halo iGPU exposes these metrics through the standard ROCm interface without requiring additional configuration.

### Additional Resources

- [ROCm GPU Operator Documentation](https://instinct.docs.amd.com/projects/gpu-operator/en/latest/index.html)
- [ROCm GPU Operator Helm Chart](https://github.com/ROCm/gpu-operator/tree/main/helm-charts-k8s)
- [Node Feature Discovery Documentation](https://kubernetes-sigs.github.io/node-feature-discovery/stable/get-started/index.html)
- [Talos Linux Documentation](https://www.talos.dev/)
