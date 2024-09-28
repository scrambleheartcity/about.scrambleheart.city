export type Link = {
  label: string;
  url: string;
};
export type SocialLink = Link & {
  icon: string;
};

export const ProjectLinks: Link[] = [
  {
    label: 'Join mailing list',
    url: 'https://forms.gle/LSc9YWop2oSNqPdAA',
  },
];
export const SocialLinks: SocialLink[] = [
  {
    label: 'Discord',
    url: 'https://discord.gg/6hbrfUgZJB',
    icon: 'assets/social/social_discord.png',
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/ScrambleHeartC',
    icon: 'assets/social/social_twitter.png',
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/scrambleheartcity/',
    icon: 'assets/social/social_instagram.png',
  },
];
