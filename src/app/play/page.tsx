import { OpenGraphConfig } from '@/components/openGraph';
import { Metadata } from 'next';
import { Playtest } from './play';

export const metadata: Metadata = {
  title: 'Scramble Heart City - Playtest',
  description: OpenGraphConfig.description,
  icons: {
    shortcut: '/assets/Grenade800.png',
  },
  openGraph: {
    ...OpenGraphConfig,
    images: [],
  },
};

export default function PlaytestPage() {
  return <Playtest />;
}
