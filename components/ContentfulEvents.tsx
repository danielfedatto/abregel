'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Event } from '@/types/contentful';
import { getImageUrl, formatContentfulDate } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ExternalLink, ArrowRight } from 'lucide-react';

export default function ContentfulEvents() {
  const { data: events, loading, error } = useContentful<Event>('event', {
    limit: 6,
    order: ['fields.startDate'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Próximos Eventos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando eventos...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !events || events.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Próximos Eventos
          </h2>
          <p className="text-lg text-gray-600">
            Nenhum evento encontrado. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  // Separar eventos futuros e passados
  const now = new Date();
  const upcomingEvents = events.filter(event => 
    new Date(event.fields.startDate) >= now
  ).slice(0, 6);
  
  const pastEvents = events.filter(event => 
    new Date(event.fields.startDate) < now
  ).slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Eventos Futuros */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Próximos Eventos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Participe dos nossos próximos eventos e encontros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.sys.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Imagem do evento */}
                {event.fields.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(event.fields.image)}
                      alt={event.fields.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <CardHeader className="pb-4">
                  {/* Categoria */}
                  {event.fields.category && (
                    <Badge variant="secondary" className="w-fit mb-3">
                      {event.fields.category}
                    </Badge>
                  )}

                  {/* Título */}
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                    {event.fields.title}
                  </CardTitle>

                                     {/* Data */}
                   <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                     <div className="flex items-center gap-1">
                       <Calendar className="w-4 h-4" />
                       <span>{formatContentfulDate(event.fields.startDate)}</span>
                     </div>
                   </div>

                  {/* Local */}
                  {event.fields.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.fields.location}</span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Descrição */}
                  {event.fields.description && (
                    <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                      {event.fields.description}
                    </CardDescription>
                  )}

                                     {/* Botões de ação */}
                   <div className="flex gap-2">
                     {event.fields.registrationLink && (
                       <Button
                         size="sm"
                         className="flex-1 bg-primary-500 hover:bg-primary-600"
                       >
                         Inscrever-se
                         <ArrowRight className="w-4 h-4 ml-2" />
                       </Button>
                     )}
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Eventos Passados */}
        {pastEvents.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Eventos Anteriores
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Reviva os momentos especiais dos nossos eventos passados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <Card key={event.sys.id} className="group hover:shadow-lg transition-all duration-300">
                                   {event.fields.image && (
                   <div className="relative overflow-hidden">
                     <img
                       src={getImageUrl(event.fields.image)}
                       alt={event.fields.title}
                       className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                     />
                   </div>
                 )}

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                      {event.fields.title}
                    </CardTitle>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatContentfulDate(event.fields.startDate)}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {event.fields.description && (
                      <CardDescription className="text-gray-600 line-clamp-2 mb-4">
                        {event.fields.description}
                      </CardDescription>
                    )}
                    
                    <Button variant="ghost" size="sm" className="w-full">
                      Ver detalhes
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Botão para ver todos os eventos */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3"
          >
            Ver todos os eventos
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
