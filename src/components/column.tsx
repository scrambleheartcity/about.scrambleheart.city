import { PropsWithChildren } from 'react';
import styles from './column.module.css';

export function Column(props: PropsWithChildren) {
  return (
    <div className={styles.column}>
      <div className={styles.inner}>{props.children}</div>
    </div>
  );
}
