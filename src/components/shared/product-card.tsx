"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';
import type { ProductDef } from '@/lib/products';

interface ProductCardProps {
  product: ProductDef;
  className?: string;
}

/** Card de producto canónica — única implementación para home y /products. Ver DESIGN.md. */
export function ProductCard({ product, className }: ProductCardProps) {
  const { language } = useLanguage();
  const Icon = product.icon;
  const knowMore = language === 'es' ? 'Conocer más' : 'Learn more';

  return (
    <Link
      href={product.href}
      className={cn(
        'group flex h-full flex-col rounded-2xl border border-black/5 bg-card p-7 card-elevated card-hover',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn('flex size-11 items-center justify-center overflow-hidden rounded-xl', product.chipClass)}>
          {product.logo ? (
            <Image src={product.logo} alt="" aria-hidden width={44} height={44} className="size-11 object-contain" />
          ) : (
            <Icon className="size-5" aria-hidden />
          )}
        </span>
        <div>
          <h3 className="font-headline text-xl font-bold leading-tight">{product.name[language]}</h3>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.12em]', product.chipClass.split(' ')[1])}>
            {product.tag[language]}
          </p>
        </div>
      </div>
      <p className="mt-5 font-serif text-lg leading-snug text-foreground/90">
        {product.pain[language]}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {product.description[language]}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {knowMore}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
