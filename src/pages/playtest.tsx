import { useEffect } from 'react';

export default function Playtest() {
  useEffect(() => {
    const search = window.location.search;
    const target =
      'https://play.void.dev/mpaulweeks/scramble-heart-city/preview/playtest/';
    window.location.href = target + search;
  }, []);
  return 'redirecting...';
}
