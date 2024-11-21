'use client';

import { useGpuTracker } from '@/hooks/useGpuTracker';

export default function GpuTest() {
  const { textures, addTexture, loaded } = useGpuTracker();
  return (
    <main
      style={{
        textAlign: 'center',
        margin: '2em',
      }}
    >
      <h1>GPU Test</h1>
      {loaded ? (
        <>
          <button onClick={addTexture}>Add Texture</button>
          <div>Allocated textures: {textures.length}</div>
        </>
      ) : (
        <div>loading...</div>
      )}
    </main>
  );
}
