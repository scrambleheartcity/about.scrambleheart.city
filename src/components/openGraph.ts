import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

type MyOpenGraph = OpenGraph &
  Required<Pick<OpenGraph, 'title' | 'description'>>;
export const OpenGraphConfig: MyOpenGraph = {
  title: 'Scramble Heart City',
  description: `Scramble Heart City is a browser-based 3v3 tag team fighting game that's coming soon!`,
  url: 'https://scrambleheart.city',
  // only use when different from title, looks weird when its the same
  // siteName: 'Scramble Heart City',
  images: [
    {
      // must be absolute
      url: 'https://scrambleheart.city/assets/poster_1920x1440.jpg',
      width: 1920,
      height: 1440,
    },
  ],
  locale: 'en_US',
  type: 'website',
};
