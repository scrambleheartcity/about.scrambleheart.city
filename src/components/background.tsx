'use client';

import React, { useState } from 'react';
import styles from './background.module.css';

export function Background(
  props: {
    img: string | undefined;
    video?: string;
  } & React.PropsWithChildren,
) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: props.img && !loaded ? `url(${props.img})` : undefined,
      }}
    >
      {props.video && (
        <video
          className={styles.video}
          autoPlay={true}
          muted={true}
          loop={true}
          style={{ opacity: loaded ? 1 : 0 }}
          onTimeUpdate={() => setLoaded(true)}
        >
          <source src={props.video}></source>
        </video>
      )}
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
