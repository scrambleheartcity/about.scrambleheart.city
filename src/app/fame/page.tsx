import { MarkdownPage } from '@/components/markdownPage';
import { OpenGraphConfig } from '@/components/openGraph';
import fs from 'fs';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const playGraph: OpenGraph = {
  ...OpenGraphConfig,
  title: 'Scramble Heart City - Community',
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
  const file = await fs.promises.readFile('fame.md');
  const data = await file.toString();
  return data;
}

export default async function CommunityPage() {
  const markdown = await fetchData();
  return <MarkdownPage markdown={markdown} />;
}
