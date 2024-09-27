import { SocialLink } from '@/app/data';

export function SocialIcon(props: { link: SocialLink }) {
  const { link } = props;
  return (
    <div>
      <a href={link.url}>
        <img src={link.icon} style={{ height: '48px' }} alt={link.label} />
      </a>
    </div>
  );
}
