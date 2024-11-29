import { OpenGraphConfig } from '@/components/openGraph';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { PlaytestComp } from './play';

const playGraph: OpenGraph = {
  ...OpenGraphConfig,
  title: 'Scramble Heart City - Playtest',
  images: [],
};
export const metadata: Metadata = {
  title: playGraph.title,
  description: playGraph.description,
  icons: {
    shortcut: '/assets/Grenade800.png',
  },
  openGraph: playGraph,
};

export default function PlaytestPage() {
  return <PlaytestComp />;
}
