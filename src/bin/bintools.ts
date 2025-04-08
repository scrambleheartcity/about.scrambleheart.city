import fs from 'fs';

export function ensureDirectory(path: string) {
  let curr = '';
  for (const folder of path.split('/')) {
    if (curr.length > 0) curr += '/';
    curr += folder;
    if (!fs.existsSync(curr)) {
      fs.mkdirSync(curr);
    }
  }
}
