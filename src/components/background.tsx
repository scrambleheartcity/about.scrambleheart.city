import React from 'react';
import styles from './background.module.css';
import { classCat } from './util';

export function Background(
  props: React.PropsWithChildren & {
    image: 'promo' | 'stage';
    fixed?: boolean;
  },
) {
  const movement = props.fixed ? styles.imageFixed : styles.imageSlide;
  return (
    <div className={styles.wrapper}>
      {props.image === 'promo' ? (
        <div
          className={classCat(styles.imageHolder, movement, styles.bg0)}
        ></div>
      ) : (
        <>
          <div
            className={classCat(styles.imageHolder, movement, styles.bg1)}
          ></div>
          <div
            className={classCat(styles.imageHolder, movement, styles.bg2)}
          ></div>
          <div
            className={classCat(styles.imageHolder, movement, styles.bg3)}
          ></div>
          <div
            className={classCat(styles.imageHolder, movement, styles.bg4)}
          ></div>
          <div
            className={classCat(styles.imageHolder, movement, styles.bg5)}
          ></div>
          <div
            className={classCat(styles.imageHolder, movement, styles.bg6)}
          ></div>
        </>
      )}
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
