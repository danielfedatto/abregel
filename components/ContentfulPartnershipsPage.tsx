'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Partner } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { Building, ExternalLink, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ContentfulPartnershipsPage() {
  const { data: partners, loading, error } = useContentful<Partner>('partner', {
    limit: 20,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section Skeleton */}
        <section className="pt-32 pb-16 bg-gradient-primary text-white">
          <div className="container-section">
            <div className="text-center">
              <div className="h-12 bg-white/20 rounded-lg mb-4 max-w-md mx-auto animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded-lg mb-2 max-w-2xl mx-auto animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded-lg max-w-xl mx-auto animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Partners Grid Skeleton */}
        <section className="section-padding">
          <div className="container-section">
            <div className="text-center mb-12">
              <div className="h-8 bg-muted rounded-lg mb-4 max-w-sm mx-auto animate-pulse"></div>
              <div className="h-5 bg-muted rounded-lg max-w-lg mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="bg-card rounded-xl border border-border/50 p-6 animate-pulse"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-muted rounded-lg mr-4"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-muted rounded-lg mb-2"></div>
                      <div className="h-4 bg-muted rounded-lg w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-muted rounded-lg mb-2"></div>
                  <div className="h-4 bg-muted rounded-lg w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !partners || partners.length === 0) {
    return (
      <div className="min-h-screen">
        <section className="pt-32 pb-16 bg-gradient-primary text-white">
          <div className="container-section">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Nossas Parcerias
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Nenhum parceiro encontrado. Verifique o Contentful.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Nossas Parcerias
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Trabalhamos em conjunto com empresas e organizações de referência 
              para oferecer ainda mais valor aos nossos associados e fortalecer 
              o setor industrial brasileiro.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Conheça Nossos Parceiros</h2>
            <p className="section-subtitle mx-auto">
              Empresas e organizações que compartilham nossa visão de 
              desenvolvimento sustentável e inovação no setor industrial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div 
                key={partner.sys.id}
                className="bg-card rounded-xl border border-border/50 p-6 hover:shadow-lg transition-all duration-300 card-hover"
              >
                <div className="flex items-center mb-4">
                  {partner.fields.logo ? (
                    <div className="w-16 h-16 bg-muted rounded-lg mr-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={getImageUrl(partner.fields.logo)}
                        alt={partner.fields.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-muted rounded-lg mr-4 flex items-center justify-center">
                      <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {partner.fields.name}
                    </h3>
                    {partner.fields.category && (
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {partner.fields.category}
                      </span>
                    )}
                  </div>
                </div>

                {partner.fields.description && (
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {partner.fields.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  {partner.fields.website ? (
                    <a
                      href={partner.fields.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Visitar Site
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      Parceiro Estratégico
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Benefícios das Parcerias</h2>
            <p className="section-subtitle mx-auto">
              Nossas parcerias estratégicas trazem vantagens exclusivas para nossos associados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Networking</h3>
              <p className="text-muted-foreground text-sm">
                Conexões estratégicas com empresas líderes do setor.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Oportunidades</h3>
              <p className="text-muted-foreground text-sm">
                Acesso a projetos e negócios exclusivos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Inovação</h3>
              <p className="text-muted-foreground text-sm">
                Tecnologias e soluções de ponta para seu negócio.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Crescimento</h3>
              <p className="text-muted-foreground text-sm">
                Suporte para expansão e desenvolvimento empresarial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center">
            <h2 className="section-title">
              Quer Ser Nosso Parceiro?
            </h2>
            <p className="section-subtitle mb-8">
              Entre em contato conosco e descubra como sua empresa pode se juntar 
              à nossa rede de parcerias estratégicas.
            </p>
            <Link href="/contato" className="btn-primary">
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
