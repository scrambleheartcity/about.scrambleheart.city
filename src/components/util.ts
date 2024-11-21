export function classCat(...args: (string | undefined)[]) {
  return args.flatMap(e => (e ? [e] : [])).join(' ');
}

export async function detectWebGPU(): Promise<boolean> {
  try {
    const webgpu = await navigator.gpu.requestAdapter();
    return !!webgpu;
  } catch (err) {
    console.log(err);
  }
  return false;
}
