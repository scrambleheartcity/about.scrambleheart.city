export type Link = {
  label: string;
  url: string;
  sameTab?: boolean;
  window?: [Date, Date];
};
export type SocialLink = Link & {
  icon: string;
};

export const ProdUrl = `https://staging.scrambleheart.city/dev`;
export const PlaytestUrl = `https://playtest.scrambleheart.city`;
export const FeatureFlagsUrl = `https://shc-matchmaker-default-rtdb.firebaseio.com/flags.json`;
export const SteamUrl =
  'https://store.steampowered.com/app/3041800/Scramble_Heart_City/';
export const DiscordUrl = 'https://discord.gg/6hbrfUgZJB';
export const ProjectLinks: Link[] = [
  {
    label: 'Playtest in the Browser',
    url: './play',
    sameTab: true,
  },
  {
    label: 'Wishlist on Steam',
    url: SteamUrl,
  },
  {
    label: 'Join the Discord',
    url: DiscordUrl,
  },
];

export const YouTubeEmbedUrl =
  'https://www.youtube.com/embed/f6QIJiZ9wG4?start=35';
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
