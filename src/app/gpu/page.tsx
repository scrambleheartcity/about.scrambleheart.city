'use client';

import { useGpuTest } from '@/hooks/gpuTest';

export default function GpuTest() {
  const { textures, addTexture, loaded } = useGpuTest();
  return (
    <main>
      <h1>GPU Test</h1>
      <div>Allocated textures: {textures.length}</div>
      {loaded && <button onClick={addTexture}>Add Texture</button>}
    </main>
  );
}
