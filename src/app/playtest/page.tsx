'use client';

import { useEffect } from 'react';

const target =
  'https://play.void.dev/mpaulweeks/scramble-heart-city/preview/playtest/';

export default function Playtest() {
  useEffect(() => {
    const search = window.location.search;
    window.location.href = target + search;
  }, []);
  return 'redirecting...';
}
