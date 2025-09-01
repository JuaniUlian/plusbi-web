import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <Image
      src="/logo/plus.png"
      alt="PLUS BI Logo"
      width={50}
      height={50}
      className={props.className}
    />
  );
}
