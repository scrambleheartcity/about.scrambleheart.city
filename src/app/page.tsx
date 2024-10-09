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
      <Background>
        <section className={styles.hero}>
          <img
            src="assets/scramble_logo.png"
            className={classCat(styles.logo, styles.fader)}
            alt="Scramble Heart City logo"
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
      <div
        className={classCat(
          styles.edge,
          styles.edgeDown,
          styles.edgeFill,
          styles.empty,
        )}
      ></div>
      <div
        className={classCat(styles.edge, styles.edgeDown, styles.edgeBorder)}
      ></div>
      <div
        className={classCat(
          styles.edge,
          styles.edgeDown,
          styles.edgeFill,
          styles.info,
        )}
      ></div>
      <section className={styles.info}>
        <Column>
          <div className={classCat(styles.contextualFlex, styles.infoFlex)}>
            <div className={styles.left}>
              <div className={styles.infoCopy}>
                <header>An in-browser 3v3 tag team fighting game</header>
                <div>
                  From the team behind{' '}
                  <ExternalLink href="https://about.toughlovearena.com">
                    Tough Love Arena
                  </ExternalLink>{' '}
                  comes Scramble Heart City, an exciting, action-packed fighter{' '}
                  {`that's`} playable in browser — no installation required!
                </div>
              </div>
            </div>
            <div className={styles.right}>
              {/* todo replace with youtube embed */}
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
          </div>
        </Column>
      </section>
      <div
        className={classCat(
          styles.edge,
          styles.edgeUp,
          styles.edgeFill,
          styles.info,
        )}
      ></div>
      <div
        className={classCat(styles.edge, styles.edgeUp, styles.edgeBorder)}
      ></div>
      <div
        className={classCat(
          styles.edge,
          styles.edgeUp,
          styles.edgeFill,
          styles.dates,
        )}
      ></div>
      <section className={styles.dates}>
        <Column>
          <div className={styles.contextualFlex}>
            <div className={classCat(styles.left, styles.imgWrapper)}>
              <img
                className={styles.desktop}
                src="assets/sprites/sword_3.png"
                alt="rosie sprite"
              />
              <img
                className={styles.mobile}
                src="assets/sprites/sword_4.png"
                alt="rosie sprite"
              />
            </div>
            <div className={styles.right}>
              <div className={styles.dateCopy}>
                <header>Coming soon</header>
                <div
                  className={classCat(
                    styles.contextualFlex,
                    styles.dateSubFlex,
                  )}
                >
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
                    <div>Late 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Column>
      </section>

      <div
        className={classCat(
          styles.edge,
          styles.edgeDown,
          styles.edgeFill,
          styles.dates,
        )}
      ></div>
      <div
        className={classCat(styles.edge, styles.edgeDown, styles.edgeBorder)}
      ></div>
      <div
        className={classCat(
          styles.edge,
          styles.edgeDown,
          styles.edgeFill,
          styles.info,
        )}
      ></div>
      <section className={styles.footer}>
        <ExternalLink href="https://mpaul.games">
          © M. Paul Games LLC
        </ExternalLink>
      </section>
    </main>
  );
}
