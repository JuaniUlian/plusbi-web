
'use client';

import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/shared/page-hero';
import { ProductCard } from '@/components/shared/product-card';
import { ContactSection } from '@/components/shared/contact-section';
import { useLanguage } from '@/contexts/language-context';
import { PRODUCTS } from '@/lib/products';

const content = {
  es: {
    badge: 'Nuestros productos',
    title: 'Cada producto nace de un problema real.',
    subtitle:
      'No vendemos tecnología: resolvemos dolores concretos de la gestión pública. Encontrá el tuyo.',
  },
  en: {
    badge: 'Our products',
    title: 'Every product is born from a real problem.',
    subtitle:
      'We do not sell technology: we solve concrete pains of public administration. Find yours.',
  },
};

export default function ProductsPage() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow={<Badge variant="secondary" className="px-4 py-1.5 text-xs tracking-[0.15em] uppercase">{c.badge}</Badge>}
        title={c.title}
        subtitle={c.subtitle}
      />

      <section className="bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
