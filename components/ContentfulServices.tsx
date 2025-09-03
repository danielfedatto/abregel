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
  ChevronRight
} from 'lucide-react';

export default function ContentfulServices() {
  const { data: services, loading, error } = useContentful<Service>('service', {
    limit: 6,
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando serviços...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-12 w-12 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !services || services.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600">
            Nenhum serviço encontrado. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Nossos Serviços
          </h2>
          <p className="section-subtitle mx-auto">
            Oferecemos uma ampla gama de serviços para atender às necessidades dos nossos associados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.sys.id}>
              <CardHeader>
                {service.fields.image && (
                  <div className="w-16 h-16 mx-auto mb-4">
                    <img
                      src={getImageUrl(service.fields.image)}
                      alt={service.fields.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                {service.fields.icon && !service.fields.image && (
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="h-8 w-8 text-white">
                      {getIconComponent(service.fields.icon)}
                    </div>
                  </div>
                )}
                <CardTitle className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.fields.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xl text-muted-foreground mb-4 leading-relaxed">
                  {service.fields.description}
                </CardDescription>
                <Link 
                  href={service.fields.slug}
                  className="inline-flex items-center text-primary font-medium link-hover group-hover:text-primary-700 transition-colors duration-300"
                >
                  Saiba mais
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {service.fields.features && service.fields.features.length > 0 && (
                  <ul className="space-y-2">
                    {service.fields.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
