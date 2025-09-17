'use client';

import { Users } from 'lucide-react';
import { useContentful } from '@/hooks/use-contentful';
import { Director } from '@/types/contentful';

export default function ContentfulDirectorsSection() {
  const { data: directors, loading, error } = useContentful<Director>('director', {
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section id="diretoria" className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded-lg mb-4 animate-pulse mx-auto w-64" />
            <div className="h-6 bg-muted rounded-lg animate-pulse mx-auto w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center bg-card p-6 rounded-2xl border border-border/50">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
                <div className="h-6 bg-muted rounded-lg mb-2 animate-pulse" />
                <div className="h-4 bg-muted rounded-lg mb-2 animate-pulse" />
                <div className="h-4 bg-muted rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !directors || directors.length === 0) {
    // Fallback para dados estáticos se não houver dados do Contentful
    const fallbackDirectors = [
      { name: 'Carlos Silva', position: 'Presidente', company: 'Metalúrgica Silva' },
      { name: 'Ana Santos', position: 'Vice-Presidente', company: 'Indústrias Santos' },
      { name: 'Roberto Lima', position: 'Diretor Financeiro', company: 'Lima & Associados' },
      { name: 'Maria Costa', position: 'Diretora de Relações', company: 'Costa Industrial' },
    ];

    return (
      <section id="diretoria" className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Nossa Diretoria</h2>
            <p className="section-subtitle mx-auto">
              Líderes experientes e comprometidos com o desenvolvimento do setor industrial.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fallbackDirectors.map((director) => (
              <div key={director.name} className="text-center bg-card p-6 rounded-2xl border border-border/50 card-hover">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-1">{director.name}</h3>
                <p className="text-primary font-medium mb-2">{director.position}</p>
                <p className="text-sm text-muted-foreground">{director.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="diretoria" className="section-padding">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">Nossa Diretoria</h2>
          <p className="section-subtitle mx-auto">
            Líderes experientes e comprometidos com o desenvolvimento do setor industrial.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {directors.map((director) => (
            <div key={director.sys.id} className="text-center bg-card p-6 rounded-2xl border border-border/50 card-hover">
              <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-1">{director.fields.name}</h3>
              <p className="text-primary font-medium mb-2">{director.fields.role}</p>
              <p className="text-sm text-muted-foreground">{director.fields.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
