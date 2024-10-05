import React from 'react';
import styles from './background.module.css';
import { classCat } from './util';

export function Background(props: React.PropsWithChildren) {
  return (
    <div className={styles.wrapper}>
      <div className={classCat(styles.image, styles.bg1)}></div>
      <div className={classCat(styles.image, styles.bg2)}></div>
      <div className={classCat(styles.image, styles.bg3)}></div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
