import { ReactNode } from 'react';

export const ExternalLink = (args: { label: ReactNode; src: string }) => (
  <a href={args.src} className="text-blue-300 font-semibold">
    {args.label}
  </a>
);
