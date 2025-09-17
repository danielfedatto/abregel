'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Partner, PartnershipsPage } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building, 
  ExternalLink, 
  Globe,
  Handshake,
  Target,
  Users,
  Award,
  Briefcase,
  Star,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ContentfulPartnershipsPage() {
  const { data: partners, loading: partnersLoading, error: partnersError } = useContentful<Partner>('partner', {
    limit: 20,
    order: ['fields.order'],
  });

  const { data: pageData, loading: pageLoading, error: pageError } = useContentful<PartnershipsPage>('3D7Q815yu5Ap3Ukov8frF3', {
    limit: 1,
    order: ['fields.order'],
  });

  const loading = partnersLoading || pageLoading;
  const error = partnersError || pageError;

  // Função para mapear nomes de ícones para componentes
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      building: Building,
      handshake: Handshake,
      target: Target,
      users: Users,
      award: Award,
      briefcase: Briefcase,
      star: Star,
      globe: Globe,
    };
    
    const IconComponent = iconMap[iconName.toLowerCase()] || Building;
    return <IconComponent className="w-8 h-8" />;
  };

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
                <div key={i} className="bg-card rounded-xl border border-border/50 p-6 animate-pulse">
                  <div className="w-16 h-16 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded-lg mb-2"></div>
                  <div className="h-4 bg-muted rounded-lg mb-2"></div>
                  <div className="h-4 bg-muted rounded-lg w-3/4"></div>
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
                {pageData?.[0]?.fields?.heroTitle || 'Nossas Parcerias'}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {pageData?.[0]?.fields?.heroDescription || 'Nenhum parceiro encontrado. Verifique o Contentful.'}
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
              {pageData?.[0]?.fields?.heroTitle || 'Nossas Parcerias'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {pageData?.[0]?.fields?.heroDescription || 'Trabalhamos em conjunto com empresas e organizações de referência para oferecer ainda mais valor aos nossos associados e fortalecer o setor industrial brasileiro.'}
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">
              {pageData?.[0]?.fields?.sectionTitle || 'Conheça Nossos Parceiros'}
            </h2>
            <p className="section-subtitle mx-auto">
              {pageData?.[0]?.fields?.sectionDescription || 'Empresas e organizações que compartilham nossa visão de desenvolvimento sustentável e inovação no setor industrial.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <Card key={partner.sys.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="text-center">
                  {partner.fields.logo ? (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden">
                      <img
                        src={getImageUrl(partner.fields.logo)}
                        alt={partner.fields.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <div className="h-10 w-10 text-white flex items-center justify-center">
                        {getIconComponent(partner.fields.icon || 'building')}
                      </div>
                    </div>
                  )}
                  
                  <CardTitle className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {partner.fields.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                    {partner.fields.description}
                  </CardDescription>

                  {partner.fields.category && (
                    <div className="mb-6">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {partner.fields.category}
                      </div>
                    </div>
                  )}

                  {partner.fields.website ? (
                    <a
                      href={partner.fields.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors duration-300 group/link"
                    >
                      Visitar Site
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center text-muted-foreground font-medium">
                      Parceiro Estratégico
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
