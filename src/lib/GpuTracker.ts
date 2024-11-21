export class GpuTracker {
  // store in array to ensure that textures are not GCed
  readonly textures: GPUTexture[] = [];

  alive = true;

  constructor(readonly device: GPUDevice) {
    device.lost.then(info => {
      console.error('GPU Device lost', info);
      this.alive = false;
    });
    device.onuncapturederror = error => {
      console.error(`GPU Uncaptured error`, error);
    };
  }

  addTexture(): GPUTexture | void {
    if (!this.alive) return;

    const texture = this.device.createTexture({
      size: [4096, 4096],
      format: 'rgba8unorm',
      dimension: '2d',
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });

    // this step is necessary to actually consume the memory
    const commandEncoder = this.device.createCommandEncoder();
    this.device.queue.submit([commandEncoder.finish()]);

    this.textures.push(texture);
    return texture;
  }

  getMemoryUsage() {
    return this.textures.reduce(
      (sum, texture) => sum + texture.width * texture.height * 4,
      0,
    );
  }

  static async fromNavigator() {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error('WebGPU not supported');
    }
    const device = await adapter.requestDevice();
    return new GpuTracker(device);
  }
}
