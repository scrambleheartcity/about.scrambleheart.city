'use client';

import React, { useState } from 'react';

export function Background(
  props: { img: string | undefined; video?: string } & React.PropsWithChildren,
) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: props.img && !loaded ? `url(${props.img})` : undefined,
      }}
    >
      {props.video && (
        <video
          className="min-w-full min-h-screen max-w-none max-h-none fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          autoPlay={true}
          muted={true}
          loop={true}
          style={{ opacity: loaded ? 1 : 0 }}
          onTimeUpdate={() => setLoaded(true)}
        >
          <source src={props.video}></source>
        </video>
      )}
      <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0">
        {props.children}
      </div>
    </div>
  );
}
