import { Background } from '@/components/background';
import { ExternalLink } from '@/components/link';
import { ProjectLinks, SocialLinks } from './data';

export default function Home() {
  return (
    <main>
      <Background img="assets/newtagfighter_4.jpg">
        <article className="bg-black bg-opacity-80 text-white p-12 flex flex-col justify-center items-center">
          hello
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
        </article>
      </Background>
    </main>
  );
}
