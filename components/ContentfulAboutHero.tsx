'use client';

import { useContentful } from '@/hooks/use-contentful';
import { AboutSection } from '@/types/contentful';

export default function ContentfulAboutHero() {
  const { data: aboutSections, loading, error } = useContentful<AboutSection>('5SUzJhIyyaVuKkh1fw9uA1', {
    limit: 1,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="pt-20 pb-16 bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <div className="h-12 bg-white/20 rounded-lg mb-6 animate-pulse mx-auto w-96" />
            <div className="h-6 bg-white/20 rounded-lg animate-pulse mx-auto w-full max-w-3xl" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !aboutSections || aboutSections.length === 0) {
    // Fallback para dados estáticos
    return (
      <section className="pt-20 pb-16 bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Quem Somos</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Há mais de 35 anos construindo um futuro próspero para a indústria brasileira, 
              unidos pela excelência e comprometidos com o desenvolvimento sustentável do setor.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const aboutSection = aboutSections[0];

  return (
    <section className="pt-20 pb-16 bg-gradient-primary text-white">
      <div className="container-section">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {aboutSection.fields.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {aboutSection.fields.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
