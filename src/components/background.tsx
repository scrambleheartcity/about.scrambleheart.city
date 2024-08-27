import React from 'react';
import { LazyVideo } from './lazyVideo';

export function Background({
  img,
  children,
}: { img: string | undefined } & React.PropsWithChildren) {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: img ? `url(${img})` : undefined,
      }}
    >
      <LazyVideo
        autoPlay={true}
        muted={true}
        loop={true}
        src="assets/replay-2024-08-23-[480p].mp4"
        preload={'auto'}
        itemType={'video/mp4'}
        className="fixed top-0 left-0 w-screen h-screen"
      />
      <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0">
        {children}
      </div>
    </div>
  );
}
