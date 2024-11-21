export class GpuTracker {
  // store in array to ensure that textures are not GCed
  readonly textures: GPUTexture[] = [];

  constructor(readonly device: GPUDevice) {
    device.lost.then(info => {
      console.error('GPU Device lost', info);
    });
    device.onuncapturederror = error => {
      console.error(`GPU Uncaptured error`, error);
    };
  }

  addTexture(): GPUTexture {
    const texture = this.device.createTexture({
      size: [4096, 4096],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });
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
