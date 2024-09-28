import { Background } from '@/components/background';
import { ExternalLink } from '@/components/externalLink';
import { classCat } from '@/components/util';
import { ProjectLinks, SocialLinks } from './data';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <Background
        img="assets/beach_day_1080.jpg"
        // video="assets/replay-2024-08-23-[480p].mp4"
      >
        <aside className={styles.socials}>
          {SocialLinks.map(link => (
            <ExternalLink key={link.url} href={link.url}>
              <img
                src={link.icon}
                className={classCat(styles.socialIcon, styles.hover)}
                alt={link.label}
              />
            </ExternalLink>
          ))}
        </aside>
        <section className={styles.content}>
          <img src="assets/scramble_logo.png" className={styles.logo} />
          {ProjectLinks.map(link => (
            <ExternalLink key={link.url} href={link.url}>
              <div className={classCat(styles.cta, styles.hover)}>
                {link.label}
              </div>
            </ExternalLink>
          ))}
        </section>
      </Background>
    </main>
  );
}
