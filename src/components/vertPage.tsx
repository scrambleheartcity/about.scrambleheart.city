'use client';

import { Background } from '@/components/background';
import { PropsWithChildren } from 'react';
import styles from './vertPage.module.css';

export function VertPage(props: PropsWithChildren) {
  return (
    <main>
      <Background image="promo" fixed={true}>
        <div className={styles.page}>
          <aside className={styles.column}>
            <section style={{ textAlign: 'center' }}>
              <a href="/">
                <img
                  src="/assets/scramble_logo.png"
                  className={styles.logo}
                  alt="Scramble Heart City logo"
                />
              </a>
            </section>
            {props.children}
          </aside>
        </div>
      </Background>
    </main>
  );
}
