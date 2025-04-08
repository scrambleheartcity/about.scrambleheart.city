import fs from 'fs';
import { ensureDirectory } from './bintools';

async function main() {
  // calc
  const resp = await fetch(
    'https://play.void.dev/mpaulweeks/scramble-heart-city/preview/main/data/framedata.md',
  );
  const framedata = await resp.text();

  // export
  const filepath = 'public/assets/data/framedata.md';
  ensureDirectory(filepath.split('/').slice(0, -1).join('/'));
  await fs.promises.writeFile(filepath, framedata);
  console.log('generated', filepath);
}

main();
