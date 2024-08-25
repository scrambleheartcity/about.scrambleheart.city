import { Background } from '@/components/background';
import { ExternalLink } from '@/components/link';
import { ProjectLinks } from './data';

export default function Home() {
  return (
    <main>
      <Background img="assets/newtagfighter_4.jpg">
        <article className="bg-black bg-opacity-80 text-white p-12 flex flex-col justify-center items-center">
          hello
          {ProjectLinks.map(link => (
            <div>
              <ExternalLink label={link.label} src={link.url} />
            </div>
          ))}
        </article>
      </Background>
    </main>
  );
}
