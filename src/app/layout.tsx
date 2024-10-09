import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import './globals.css';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

type MyOpenGraph = OpenGraph &
  Required<Pick<OpenGraph, 'title' | 'description'>>;
const openGraph: MyOpenGraph = {
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
export const metadata: Metadata = {
  title: openGraph.title,
  description: openGraph.description,
  icons: {
    shortcut: 'assets/Grenade800.png',
  },
  openGraph: openGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId="G-9PRMTH9QGG" />
      </head>
      <body>{children}</body>
    </html>
  );
}
