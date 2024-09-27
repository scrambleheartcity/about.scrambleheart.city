import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

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
      <body>{children}</body>
    </html>
  );
}
