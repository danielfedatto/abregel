'use client';

import { Target, Eye, Heart } from 'lucide-react';
import { useContentful } from '@/hooks/use-contentful';
import { AboutSection } from '@/types/contentful';

export default function ContentfulMissionVisionValues() {
  const { data: aboutSections, loading, error } = useContentful<AboutSection>('5SUzJhIyyaVuKkh1fw9uA1', {
    limit: 1,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-section">
          <div className="grid lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center bg-card p-8 rounded-2xl border border-border/50">
                <div className="w-16 h-16 bg-muted rounded-xl mb-6 mx-auto animate-pulse" />
                <div className="h-6 bg-muted rounded-lg mb-4 animate-pulse" />
                <div className="h-4 bg-muted rounded-lg animate-pulse" />
              </div>
            ))}
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
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Defender e representar os interesses do setor industrial, promovendo seu 
                desenvolvimento sustentável através de serviços especializados, capacitação 
                e representação institucional.
              </p>
            </div>

            <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossa Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser reconhecido como a principal referência em representação sindical 
                industrial, liderando a transformação e modernização do setor no Brasil 
                e internacionalmente.
              </p>
            </div>

            <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossos Valores</h3>
              <p className="text-muted-foreground leading-relaxed">
                Transparência, ética, inovação, sustentabilidade, compromisso social 
                e excelência em tudo que fazemos para nossos associados e para a sociedade.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const aboutSection = aboutSections[0];

  return (
    <section className="section-padding">
      <div className="container-section">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossa Missão</h3>
            <p className="text-muted-foreground leading-relaxed">
              {aboutSection.fields.mission}
            </p>
          </div>

          <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossa Visão</h3>
            <p className="text-muted-foreground leading-relaxed">
              {aboutSection.fields.vision}
            </p>
          </div>

          <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossos Valores</h3>
            <p className="text-muted-foreground leading-relaxed">
              {aboutSection.fields.values}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
