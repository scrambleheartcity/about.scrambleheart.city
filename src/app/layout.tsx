import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

// todo social preview
// punching art for image preview
// title & description
export const metadata: Metadata = {
  title: 'Scramble Heart City',
  icons: {
    shortcut: 'assets/Grenade800.png',
  },
  openGraph: {
    title: 'Scramble Heart City',
    description: `Scramble Heart City is in-browser 3v3 tag team fighting game that's coming soon!`,
    url: 'https://scrambleheart.city',
    siteName: 'Scramble Heart City',
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
  },
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
