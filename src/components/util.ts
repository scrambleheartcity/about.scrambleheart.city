export function classCat(...args: (string | undefined)[]) {
  return args.flatMap(e => (e ? [e] : [])).join(' ');
}
