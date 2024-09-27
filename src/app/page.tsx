import { Background } from '@/components/background';
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
            <div>
              <a href={link.url}>
                <img
                  src={link.icon}
                  className={styles.socialIcon}
                  alt={link.label}
                />
              </a>
            </div>
          ))}
        </aside>
        <section>
          <img src="assets/scramble_logo.png" className={styles.logo} />
        </section>
        <section>
          {ProjectLinks.map(link => (
            <a key={link.url} href={link.url}>
              <div className={styles.cta}>{link.label}</div>
            </a>
          ))}
        </section>
      </Background>
    </main>
  );
}
