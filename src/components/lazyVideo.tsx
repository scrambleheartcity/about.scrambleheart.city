'use client';

import { DetailedHTMLProps, VideoHTMLAttributes, useState } from 'react';

export function LazyVideo(
  props: DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >,
) {
  const [loaded, setLoaded] = useState(false);
  return (
    <video
      {...props}
      style={{ display: loaded ? 'block' : 'none' }}
      onCanPlayThrough={() => {
        console.log('loaded!');
        setLoaded(true);
      }}
    ></video>
  );
}
