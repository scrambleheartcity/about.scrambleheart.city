import { Background } from '@/components/background';
import { ExternalLink } from '@/components/link';
import { ProjectLinks, SocialLinks } from './data';

export default function Home() {
  return (
    <main>
      <Background
        img="assets/newtagfighter_4.jpg"
        video="assets/replay-2024-08-23-[480p].mp4"
      >
        <section>
          <img src="assets/scramble_logo.png" className="h-60" />
        </section>
        <section className="bg-black text-white rounded-xl p-12 flex flex-col justify-center items-center">
          {SocialLinks.map(link => (
            <div key={link.url}>
              <ExternalLink
                label={
                  <div className="flex items-center">
                    <img
                      src={link.icon}
                      style={{ height: '2em', marginRight: '0.5em' }}
                    />
                    {link.label}
                  </div>
                }
                src={link.url}
              />
            </div>
          ))}
          {ProjectLinks.map(link => (
            <div key={link.url}>
              <ExternalLink label={link.label} src={link.url} />
            </div>
          ))}
        </section>
      </Background>
    </main>
  );
}
