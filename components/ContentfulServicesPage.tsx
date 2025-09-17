'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Service } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Building, 
  Users, 
  Shield, 
  FileText, 
  Calendar, 
  Phone, 
  Mail, 
  Globe,
  Briefcase,
  Award,
  Heart,
  Star,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

export default function ContentfulServicesPage() {
  const { data: services, loading, error } = useContentful<Service>('service', {
    limit: 20,
    order: ['fields.order'],
  });

  // Função para mapear nomes de ícones para componentes
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      building: Building,
      users: Users,
      shield: Shield,
      fileText: FileText,
      calendar: Calendar,
      phone: Phone,
      mail: Mail,
      globe: Globe,
      briefcase: Briefcase,
      award: Award,
      heart: Heart,
      star: Star,
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

        {/* Services Grid Skeleton */}
        <section className="section-padding">
          <div className="container-section">
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

  if (error || !services || services.length === 0) {
    return (
      <div className="min-h-screen">
        <section className="pt-32 pb-16 bg-gradient-primary text-white">
          <div className="container-section">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Nossos Serviços
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Nenhum serviço encontrado. Verifique o Contentful.
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
              Nossos Serviços
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços especializados para 
              impulsionar o crescimento e competitividade das empresas do setor.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Conheça Nossos Serviços</h2>
            <p className="section-subtitle mx-auto">
              Soluções especializadas para atender às necessidades específicas 
              do setor industrial e promover o desenvolvimento empresarial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.sys.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="text-center">
                  {service.fields.image ? (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl overflow-hidden">
                      <img
                        src={getImageUrl(service.fields.image)}
                        alt={service.fields.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <div className="h-10 w-10 text-white flex items-center justify-center">
                        {getIconComponent(service.fields.icon || 'building')}
                      </div>
                    </div>
                  )}
                  
                  <CardTitle className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.fields.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                    {service.fields.description}
                  </CardDescription>

                  {service.fields.features && service.fields.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-sm text-foreground mb-3">Principais características:</h4>
                      <ul className="space-y-2">
                        {service.fields.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {service.fields.features.length > 3 && (
                          <li className="text-xs text-muted-foreground/70">
                            +{service.fields.features.length - 3} outras características
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <Link 
                    href={service.fields.slug || '#'}
                    className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors duration-300 group/link"
                  >
                    Saiba mais
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Por que Escolher Nossos Serviços?</h2>
            <p className="section-subtitle mx-auto">
              Vantagens exclusivas para nossos associados e parceiros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Experiência</h3>
              <p className="text-muted-foreground text-sm">
                Mais de 35 anos de experiência no setor industrial.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Rede de Contatos</h3>
              <p className="text-muted-foreground text-sm">
                Acesso a uma ampla rede de profissionais e empresas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Confiabilidade</h3>
              <p className="text-muted-foreground text-sm">
                Serviços confiáveis e resultados comprovados.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Suporte</h3>
              <p className="text-muted-foreground text-sm">
                Acompanhamento personalizado e suporte contínuo.
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
              Precisa de Mais Informações?
            </h2>
            <p className="section-subtitle mb-8">
              Nossa equipe está pronta para esclarecer dúvidas e 
              apresentar como nossos serviços podem beneficiar sua empresa.
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
