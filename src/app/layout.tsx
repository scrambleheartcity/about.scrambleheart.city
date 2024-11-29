import { OpenGraphConfig } from '@/components/openGraph';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export const metadata: Metadata = {
  title: OpenGraphConfig.title,
  description: OpenGraphConfig.description,
  icons: {
    shortcut: '/assets/Grenade800.png',
  },
  openGraph: OpenGraphConfig,
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
