import { Background } from '@/components/background';
import { Column } from '@/components/column';
import { ExternalLink } from '@/components/externalLink';
import { classCat } from '@/components/util';
import { ProjectLinks, SocialLinks } from './data';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <aside className={styles.socials}>
        {SocialLinks.map(link => (
          <ExternalLink key={link.url} href={link.url}>
            <img
              src={link.icon}
              className={classCat(styles.socialIcon, styles.hoverCircle)}
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
          <img
            src="assets/scramble_logo.png"
            className={classCat(styles.logo, styles.fader)}
          />
          {ProjectLinks.map(link => (
            <ExternalLink key={link.url} href={link.url}>
              <div
                className={classCat(
                  styles.cta,
                  styles.hoverButton,
                  styles.fader,
                )}
              >
                {link.label}
              </div>
            </ExternalLink>
          ))}
        </section>
      </Background>
      <div className={classCat(styles.tilt, styles.info)}>
        <Column>
          <section className={styles.info}>
            <div className={styles.left}>
              <div className={styles.infoCopy}>
                <header>An in-browser 3v3 tag team fighting game</header>
                <div>
                  From the team behind{' '}
                  <ExternalLink href="https://about.toughlovearena.com">
                    Tough Love Arena
                  </ExternalLink>{' '}
                  comes Scramble Heart City, an exciting, action-packed
                  adventure that's playable in browser — no installation
                  required!
                </div>
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
                <source src="assets/video/replay-2024-08-23-[480p].mp4" />
              </video>
            </div>
          </section>
        </Column>
      </div>
      <Column>
        <section className={styles.dates}>
          <div className={styles.left}>
            <img src="assets/sprites/sword_1.png" />
          </div>
          <div className={styles.right}>
            <div className={styles.dateCopy}>
              <header>Coming soon</header>
              <div className={styles.dateCols}>
                <div className={styles.left}>
                  <div>
                    <b>Closed Alpha</b>
                  </div>
                  <div>Late 2024</div>
                </div>
                <div className={styles.right}>
                  <div>
                    <b>Early Access</b>
                  </div>
                  <div>2025</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Column>
      <footer>© M. Paul Games LLC</footer>
    </main>
  );
}
