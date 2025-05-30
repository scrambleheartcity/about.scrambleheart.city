import { MarkdownPage } from '@/components/markdownPage';
import { OpenGraphConfig } from '@/components/openGraph';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { ProdUrl } from '../data';

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

async function fetchData(): Promise<string> {
  // no CORS issue because this is SSG
  const res = await fetch(`${ProdUrl}/data/framedata.md`);
  const data = await res.text();
  return data;
}

export default async function FrameDataPage() {
  const markdown = await fetchData();
  return <MarkdownPage markdown={markdown} />;
}
