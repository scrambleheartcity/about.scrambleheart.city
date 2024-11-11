import React from 'react';
import styles from './background.module.css';
import { classCat } from './util';

export function Background(props: React.PropsWithChildren) {
  return (
    <div className={styles.wrapper}>
      <div className={classCat(styles.imageHolder, styles.bg0)}></div>
      {/* <div className={classCat(styles.imageHolder, styles.bg1)}></div> */}
      {/* <div className={classCat(styles.imageHolder, styles.bg2)}></div> */}
      {/* <div className={classCat(styles.imageHolder, styles.bg3)}></div> */}
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
