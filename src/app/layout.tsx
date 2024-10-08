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
