import { Background } from '@/components/background';
import { ExternalLink } from '@/components/externalLink';
import { classCat } from '@/components/util';
import { ProjectLinks, SocialLinks } from './data';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
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
      <Background
        img="assets/bg/rooftop_v2.jpg"
        // video="assets/video/replay-2024-08-23-[480p].mp4"
      >
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
      <section className={styles.info}>
        <div className={styles.left}>
          <div className={styles.infoCopy}>
            <h2>
              From the team behind{' '}
              <ExternalLink href="https://about.toughlovearena.com">
                Tough Love Arena
              </ExternalLink>
              !
            </h2>
            <ul>
              <li>Exciting 3v3 tag team fighting action</li>
              <li>Playable in the browser, no installation required</li>
              <li>Closed Alpha - Late 2024</li>
              <li>Early Access - 2025</li>
            </ul>
          </div>
          <div className={styles.infoSprites}>
            <img src="assets/sprites/sword_1.png" />
            <img src="assets/sprites/sword_2.png" className={styles.mirror} />
          </div>
        </div>
        <div className={styles.right}>
          <video
            className={styles.video}
            preload="none"
            autoPlay={true}
            muted={true}
            loop={true}
          >
            <source src="assets/video/replay-2024-08-23-[480p].mp4"></source>
          </video>
        </div>
      </section>
    </main>
  );
}
