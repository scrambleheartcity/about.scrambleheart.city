import { PropsWithChildren } from 'react';

export function ExternalLink(
  props: {
    href: string;
    sameTab?: boolean;
  } & PropsWithChildren,
) {
  return (
    <a href={props.href} target={props.sameTab ? undefined : '_blank'}>
      {props.children}
    </a>
  );
}
