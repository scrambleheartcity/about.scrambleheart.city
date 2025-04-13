import { OpenGraphConfig } from '@/components/openGraph';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { FrameData, FrameDataProps } from './framedata';

const playGraph: OpenGraph = {
  ...OpenGraphConfig,
  title: 'Scramble Heart City - Frame Data',
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

async function getFrameData(): Promise<FrameDataProps> {
  // no CORS issue because this is SSG
  const res = await fetch(
    'https://play.void.dev/mpaulweeks/scramble-heart-city/preview/main/data/framedata.md',
  );
  const data = await res.text();
  return { data };
}

export default async function FrameDataPage() {
  const props = await getFrameData();
  return <FrameData {...props} />;
}
