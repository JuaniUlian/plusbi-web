import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrowserFrameProps {
  src: string;
  alt: string;
  /** Texto de la barra de dirección */
  url?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

/** Marco de browser para screenshots reales de producto. Ver DESIGN.md. */
export function BrowserFrame({
  src,
  alt,
  url,
  width = 1347,
  height = 610,
  priority = false,
  className,
}: BrowserFrameProps) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-2xl border border-black/10 bg-white card-elevated zoom-hover',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-black/5 bg-secondary/60 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="size-2.5 rounded-full bg-black/15" />
        </span>
        {url && (
          <span className="mx-auto hidden truncate rounded-md bg-white/80 px-3 py-0.5 text-xs text-muted-foreground sm:block">
            {url}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto"
      />
    </figure>
  );
}
