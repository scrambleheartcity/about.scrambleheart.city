'use client';

import { useQueryParam } from '@/hooks/useQueryParam';
import { PlaytestUrl } from '../data';

export default function ErrorPage() {
  const passThru = useQueryParam('passThrough');
  const errorMessage = useQueryParam('message') ?? '';
  return (
    <main
      style={{
        textAlign: 'center',
        margin: '2em',
      }}
    >
      <h1>Error</h1>
      oh no! there was an error {`:(`}
      <pre>{errorMessage}</pre>
      {passThru && <a href={`${PlaytestUrl}/?${passThru}`}>back to game</a>}
    </main>
  );
}
