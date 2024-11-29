export type Link = {
  label: string;
  url: string;
};
export type SocialLink = Link & {
  icon: string;
};

export const ProjectLinks: Link[] = [
  {
    label: 'Join waitlist',
    url: 'https://forms.gle/LSc9YWop2oSNqPdAA',
  },
];
export const DiscordUrl = 'https://discord.gg/6hbrfUgZJB';
export const SocialLinks: SocialLink[] = [
  {
    label: 'Discord',
    url: DiscordUrl,
    icon: '/assets/social/social_discord.png',
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/ScrambleHeartC',
    icon: '/assets/social/social_twitter.png',
  },
  {
    label: 'Bluesky',
    url: 'https://bsky.app/profile/scrambleheart.city',
    icon: '/assets/social/social_bluesky.png',
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/scrambleheartcity/',
    icon: '/assets/social/social_instagram.png',
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/@ScrambleHeartCity',
    icon: '/assets/social/social_youtube.png',
  },
];
