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
        <section className={styles.cta}>
          {ProjectLinks.map(link => (
            <div key={link.url}>
              <a href={link.url}>{link.label}</a>
            </div>
          ))}
        </section>
      </Background>
    </main>
  );
}
