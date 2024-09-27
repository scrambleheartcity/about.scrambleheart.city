import { Background } from '@/components/background';
import { SocialIcon } from '@/components/social';
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
            <SocialIcon key={link.url} link={link} />
          ))}
        </aside>
        <section>
          <img src="assets/scramble_logo.png" className={styles.logo} />
        </section>
        <section>
          {ProjectLinks.map(link => (
            <a key={link.url} href={link.url} className={styles.cta}>
              <div>{link.label}</div>
            </a>
          ))}
        </section>
      </Background>
    </main>
  );
}
