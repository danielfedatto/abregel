'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Partner } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { Building } from 'lucide-react';
import Link from 'next/link';

export default function ContentfulPartners() {
  const { data: partners, loading, error } = useContentful<Partner>('partner', {
    limit: 8,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Nossos Parceiros</h2>
            <p className="section-subtitle mx-auto">
              Carregando parceiros...
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="flex items-center justify-center p-6 bg-card rounded-xl border border-border/50 animate-pulse"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-lg mb-3 mx-auto flex items-center justify-center">
                    <div className="h-8 w-8 bg-muted-foreground/20 rounded"></div>
                  </div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-20 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !partners || partners.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-section text-center">
          <h2 className="section-title">Nossos Parceiros</h2>
          <p className="section-subtitle">
            Nenhum parceiro encontrado. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">Nossos Parceiros</h2>
          <p className="section-subtitle mx-auto">
            Trabalhamos em conjunto com empresas e organizações de referência 
            para oferecer ainda mais valor aos nossos associados.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div 
              key={partner.sys.id}
              className="flex items-center justify-center p-6 bg-card rounded-xl border border-border/50 opacity-70 hover:opacity-100 transition-opacity duration-300 card-hover"
            >
              <div className="text-center">
                {partner.fields.logo ? (
                  <div className="w-16 h-16 bg-muted rounded-lg mb-3 mx-auto flex items-center justify-center overflow-hidden">
                    <img
                      src={getImageUrl(partner.fields.logo)}
                      alt={partner.fields.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-muted rounded-lg mb-3 mx-auto flex items-center justify-center">
                    <Building className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <span className="text-sm font-medium text-muted-foreground">{partner.fields.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/parcerias" className="btn-outline">
            Conheça Todas as Parcerias
          </Link>
        </div>
      </div>
    </section>
  );
}

