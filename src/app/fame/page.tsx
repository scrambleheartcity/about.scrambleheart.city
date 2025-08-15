import { MarkdownPage } from '@/components/markdownPage';
import { OpenGraphConfig } from '@/components/openGraph';
import { Fame, fetchFame } from '@/lib/google';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const playGraph: OpenGraph = {
  ...OpenGraphConfig,
  title: 'Scramble Heart City - Hall of Fame',
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

function toRow(e: Fame): string {
  return [
    '',
    e.date,
    e.tournament,
    e.champion,
    [
      e.bracket ? `[Bracket](${e.bracket})` : null,
      e.vod ? `[Video](${e.vod})` : null,
    ]
      .flatMap(s => (s ? [s] : []))
      .join(' / '),
    '',
  ].join(' | ');
}

function createMarkdown(unsorted: Fame[]): string {
  const sorted = unsorted
    .concat()
    .sort((a, b) => (a.date < b.date ? -1 : +1))
    .reverse();
  return `
# Scramble Heart City - Hall of Fame

Here we honor the tryhards who spent time getting good at a game that isn't even out yet.

### Official Tournaments

| Date       | Tournament           | Champion | Links                                                                                                                                                                                            |
| ---------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
${sorted
  .filter(e => e.official)
  .map(toRow)
  .join('\n')}

### Community Tournaments

| Date       | Tournament    | Champion | Links                                                                         |
| ---------- | ------------- | -------- | ----------------------------------------------------------------------------- |
${sorted
  .filter(e => !e.official)
  .map(toRow)
  .join('\n')}
`;
}

export default async function CommunityPage() {
  const data = await fetchFame();
  const markdown = createMarkdown(data);
  return <MarkdownPage markdown={markdown} />;
}
