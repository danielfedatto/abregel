'use client';

import Link from 'next/link';
import { Target, Eye, Heart } from 'lucide-react';
import { useContentful } from '@/hooks/use-contentful';
import { AboutSection } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';

export default function ContentfulAboutSection() {
  const { data: aboutSections, loading, error } = useContentful<AboutSection>('5SUzJhIyyaVuKkh1fw9uA1', {
    limit: 1,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-8 bg-muted rounded-lg mb-4 animate-pulse" />
              <div className="h-6 bg-muted rounded-lg mb-6 animate-pulse" />
              <div className="h-4 bg-muted rounded-lg mb-8 animate-pulse" />
              <div className="h-10 bg-muted rounded-lg w-48 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card p-6 rounded-2xl border border-border/50">
                  <div className="w-12 h-12 bg-muted rounded-xl mb-4 animate-pulse" />
                  <div className="h-6 bg-muted rounded-lg mb-2 animate-pulse" />
                  <div className="h-4 bg-muted rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !aboutSections || aboutSections.length === 0) {
    return null;
  }

  const aboutSection = aboutSections[0];

  return (
    <section className="section-padding">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">{aboutSection.fields.title}</h2>
            <p className="section-subtitle mb-6">
              {aboutSection.fields.subtitle}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {aboutSection.fields.description}
            </p>
            <Link href={aboutSection.fields.ctaLink} className="btn-primary group">
              {aboutSection.fields.ctaText}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border/50 card-hover">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Missão</h3>
              <p className="text-muted-foreground text-sm">
                {aboutSection.fields.mission}
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border border-border/50 card-hover">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Visão</h3>
              <p className="text-muted-foreground text-sm">
                {aboutSection.fields.vision}
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-2xl border border-border/50 card-hover sm:col-span-2">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Valores</h3>
              <p className="text-muted-foreground text-sm">
                {aboutSection.fields.values}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
