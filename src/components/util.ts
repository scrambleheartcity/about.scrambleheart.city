export function classCat(...args: (string | undefined)[]) {
  return args.flatMap(e => (e ? [e] : [])).join(' ');
}

export function range(a: number, b?: number, increment?: number): number[] {
  const [start, end] = b === undefined ? [0, a] : [a, b];
  const out: number[] = [];
  for (let i = start; i < end; i += increment ?? 1) {
    out.push(i);
  }
  return out;
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
