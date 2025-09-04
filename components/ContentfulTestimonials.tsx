'use client';

import Image from 'next/image';
import { useContentful } from '@/hooks/use-contentful';
import { Testimonial } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';

export default function ContentfulTestimonials() {
  const { data: testimonials, loading, error } = useContentful<Testimonial>('testimonial', {
    limit: 6,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding bg-gradient-primary">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">Depoimentos</h2>
            <p className="section-subtitle mx-auto max-w-2xl text-white/90">
              O que nossos associados dizem sobre o Sindicato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-2xl p-6 card-hover h-full flex flex-col animate-pulse">
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-6 grow"></div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-muted rounded-full"></div>
                  <div>
                    <div className="h-4 bg-muted rounded mb-2 w-24"></div>
                    <div className="h-3 bg-muted rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-gradient-primary">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Depoimentos</h2>
          <p className="section-subtitle mx-auto max-w-2xl text-white/90">
            O que nossos associados dizem sobre o Sindicato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.sys.id} className="bg-card border border-border/50 rounded-2xl p-6 card-hover h-full flex flex-col">
              <blockquote className="text-card-foreground leading-relaxed mb-6 grow">
                "{testimonial.fields.content}"
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-border/60">
                  {testimonial.fields.avatar ? (
                    <Image 
                      src={getImageUrl(testimonial.fields.avatar)} 
                      alt={testimonial.fields.name} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {testimonial.fields.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">{testimonial.fields.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.fields.role}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.fields.company}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

