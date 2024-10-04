'use client';

import React, { useState } from 'react';
import styles from './background.module.css';

export function Background(
  props: {
    img?: string[];
    video?: string;
  } & React.PropsWithChildren,
) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={styles.wrapper}>
      {!loaded && props.img
        ? props.img.map((src, i) => (
            <div
              key={src}
              className={styles.image}
              style={{
                backgroundImage: `url(${src})`,
              }}
            ></div>
          ))
        : undefined}
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
