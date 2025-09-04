'use client';

import { useContentful } from '@/hooks/use-contentful';
import { CtaSection } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import Link from 'next/link';

export default function ContentfulCTA() {
  const { data: ctaSections, loading, error } = useContentful<CtaSection>('ctaSection', {
    limit: 1,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <div className="h-12 bg-white/20 rounded mb-4 mx-auto w-96 animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded mb-8 mx-auto w-64 animate-pulse"></div>
            <div className="h-12 bg-white/20 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !ctaSections || ctaSections.length === 0) {
    return null; // Não mostrar nada se houver erro ou não houver CTAs
  }

  const cta = ctaSections[0];

  // Função para obter classes de background
  const getBackgroundClasses = () => {
    if (cta.fields.backgroundImage) {
      return 'bg-cover bg-center bg-no-repeat';
    }
    
    switch (cta.fields.backgroundColor) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      case 'accent':
        return 'bg-accent';
      case 'muted':
        return 'bg-muted';
      case 'gradient':
        return 'bg-gradient-primary';
      default:
        return 'bg-gradient-primary';
    }
  };

  // Função para obter classes de texto
  const getTextClasses = () => {
    switch (cta.fields.textColor) {
      case 'white':
        return 'text-white';
      case 'black':
        return 'text-black';
      case 'primary':
        return 'text-primary';
      case 'secondary':
        return 'text-secondary';
      default:
        return 'text-white';
    }
  };

  const backgroundStyle = cta.fields.backgroundImage 
    ? { backgroundImage: `url(${getImageUrl(cta.fields.backgroundImage)})` }
    : {};

  return (
    <section 
      className={`section-padding ${getBackgroundClasses()} ${getTextClasses()} relative overflow-hidden`}
      style={backgroundStyle}
    >
      {cta.fields.backgroundImage && (
        <div className="absolute inset-0 bg-black/50"></div>
      )}
      
      <div className="container-section relative z-10">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            {cta.fields.title}
          </h2>
          
          {cta.fields.subtitle && (
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {cta.fields.subtitle}
            </p>
          )}
          
          {cta.fields.description && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              {cta.fields.description}
            </p>
          )}
          
          <Link 
            href={cta.fields.ctaLink}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary bg-white rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {cta.fields.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
