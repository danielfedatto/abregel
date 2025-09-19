'use client';

import { useContentful } from '@/hooks/use-contentful';
import { FiespItem, FiespPage } from '@/types/contentful';
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
  CheckCircle,
  GraduationCap,
  CreditCard,
  Microscope,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function ContentfulFiespPage() {
  const { data: fiespItems, loading: itemsLoading, error: itemsError } = useContentful<FiespItem>('2snDpyZO1d67Kloe1AOKMF', {
    limit: 20,
    order: ['fields.order'],
  });

  const { data: pageData, loading: pageLoading, error: pageError } = useContentful<FiespPage>('50tWjMXo9lKXAPNMBjEUCa', {
    limit: 1,
    order: ['fields.order'],
  });

  const loading = itemsLoading || pageLoading;
  const error = itemsError || pageError;

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
      'graduation-cap': GraduationCap,
      'credit-card': CreditCard,
      microscope: Microscope,
      shield: Shield,
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

        {/* Items Grid Skeleton */}
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

  if (error || !fiespItems || fiespItems.length === 0) {
    return (
      <div className="min-h-screen">
        <section className="pt-32 pb-16 bg-gradient-primary text-white">
          <div className="container-section">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {pageData?.[0]?.fields?.heroTitle || 'Parceria Estratégica FIESP'}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {pageData?.[0]?.fields?.heroDescription || 'Nenhum item encontrado. Verifique o Contentful.'}
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
              {pageData?.[0]?.fields?.heroTitle || 'Parceria Estratégica FIESP'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {pageData?.[0]?.fields?.heroDescription || 'Uma aliança poderosa entre o Sindicato Industrial e a Federação das Indústrias do Estado de São Paulo para fortalecer o setor industrial brasileiro.'}
            </p>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">
              {pageData?.[0]?.fields?.sectionTitle || 'Benefícios da Parceria'}
            </h2>
            <p className="section-subtitle mx-auto">
              {pageData?.[0]?.fields?.sectionDescription || 'Conheça os principais benefícios e serviços disponíveis através desta parceria estratégica.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fiespItems.map((item) => (
              <Card key={item.sys.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <div className="h-10 w-10 text-white flex items-center justify-center">
                      {getIconComponent(item.fields.icon)}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.fields.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                    {item.fields.description}
                  </CardDescription>

                  {item.fields.category && (
                    <div className="mb-6">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {item.fields.category}
                      </div>
                    </div>
                  )}

                  {item.fields.website ? (
                    <a
                      href={item.fields.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors duration-300 group/link"
                    >
                      Saiba Mais
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center text-muted-foreground font-medium">
                      Benefício Exclusivo
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
