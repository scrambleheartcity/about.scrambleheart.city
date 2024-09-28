import { PropsWithChildren } from 'react';

export function ExternalLink(
  props: {
    href: string;
  } & PropsWithChildren,
) {
  return (
    <a href={props.href} target="_blank">
      {props.children}
    </a>
  );
}
