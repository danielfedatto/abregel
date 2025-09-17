'use client';

import Link from 'next/link';
import { Award } from 'lucide-react';
import { useContentful } from '@/hooks/use-contentful';
import { AboutSection } from '@/types/contentful';

export default function ContentfulAboutCTA() {
  const { data: aboutSections, loading, error } = useContentful<AboutSection>('5SUzJhIyyaVuKkh1fw9uA1', {
    limit: 1,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center bg-card p-12 rounded-3xl border border-border/50">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-6 animate-pulse" />
            <div className="h-8 bg-muted rounded-lg mb-4 animate-pulse mx-auto w-96" />
            <div className="h-6 bg-muted rounded-lg mb-8 animate-pulse mx-auto w-64" />
            <div className="h-10 bg-muted rounded-lg w-48 mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !aboutSections || aboutSections.length === 0) {
    // Fallback para dados estáticos
    return (
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center bg-card p-12 rounded-3xl border border-border/50">
            <Award className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-card-foreground mb-4">
              Faça Parte da Nossa História
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que confiam em nosso trabalho 
              para representar seus interesses e impulsionar o crescimento do setor.
            </p>
            <Link href="/contato" className="btn-primary">
              Associe-se Agora
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const aboutSection = aboutSections[0];

  return (
    <section className="section-padding">
      <div className="container-section">
        <div className="text-center bg-card p-12 rounded-3xl border border-border/50">
          <Award className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-card-foreground mb-4">
            Faça Parte da Nossa História
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {aboutSection.fields.description}
          </p>
          <Link href={aboutSection.fields.ctaLink} className="btn-primary">
            {aboutSection.fields.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
