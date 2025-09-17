'use client';

import { useContentful } from '@/hooks/use-contentful';
import { NumbersSection } from '@/types/contentful';

export default function ContentfulNumbersSection() {
  const { data: numbersSections, loading, error } = useContentful<NumbersSection>('5XNHoqe1kdxKqnUXR8yB8u', {
    limit: 1,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center mb-12">
            <div className="h-8 bg-white/20 rounded-lg mb-4 animate-pulse mx-auto w-96" />
            <div className="h-6 bg-white/20 rounded-lg animate-pulse mx-auto w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-12 bg-white/20 rounded-lg mb-2 animate-pulse" />
                <div className="h-4 bg-white/20 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !numbersSections || numbersSections.length === 0) {
    // Fallback para dados estáticos
    const fallbackNumbers = [
      { value: '+500', label: 'Empresas Associadas' },
      { value: '35+', label: 'Anos de Experiência' },
      { value: '50+', label: 'Eventos por Ano' },
      { value: '1M+', label: 'Empregos Representados' },
    ];

    return (
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Números que Falam por Si
            </h2>
            <p className="text-xl text-white/90">
              Resultados concretos do nosso trabalho em prol do setor industrial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fallbackNumbers.map((number, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{number.value}</div>
                <p className="text-white/80">{number.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const numbersSection = numbersSections[0];

  return (
    <section className="section-padding bg-gradient-primary text-white">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {numbersSection.fields.title}
          </h2>
          <p className="text-xl text-white/90">
            {numbersSection.fields.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {numbersSection.fields.numbers?.map((number, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {number.fields.value}
              </div>
              <p className="text-white/80">
                {number.fields.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}