import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <Image
      src="/logo/Logo en blanco sin fondo2.png"
      alt="PLUS BI Logo"
      width={50}
      height={50}
      className={props.className}
    />
  );
}
