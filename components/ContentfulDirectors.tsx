'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Director } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

export default function ContentfulDirectors() {
  const { data: directors, loading, error } = useContentful<Director>('1DQsMDPVZOjClyhnmExxrh', {
    limit: 12,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nossa Diretoria
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando diretores...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="text-center animate-pulse">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <CardContent>
                  <div className="h-5 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !directors || directors.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nossa Diretoria
          </h2>
          <p className="text-lg text-gray-600">
            Nenhum diretor encontrado. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nossa Diretoria
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça os profissionais que lideram nossa organização
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {directors.map((director) => (
            <Card key={director.sys.id} className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                {/* Foto do diretor */}
                <div className="relative mb-6">
                  {director.fields.photo ? (
                    <img
                      src={getImageUrl(director.fields.photo)}
                      alt={director.fields.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center mx-auto border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <span className="text-4xl font-bold text-primary-600">
                        {director.fields.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Badge de cargo */}
                  {director.fields.role && (
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs">
                      {director.fields.role}
                    </Badge>
                  )}
                </div>

                {/* Informações do diretor */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {director.fields.name}
                  </h3>
                  
                  {director.fields.role && (
                    <p className="text-gray-600 font-medium mb-2">
                      {director.fields.role}
                    </p>
                  )}
                  
                  {director.fields.company && (
                    <p className="text-sm text-gray-500 mb-3">
                      {director.fields.company}
                    </p>
                  )}
                  
                  {director.fields.bio && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {director.fields.bio}
                    </p>
                  )}
                </div>

                {/* Informações de contato */}
                <div className="space-y-2 mb-4">
                  {director.fields.company && (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4" />
                      <span className="truncate">{director.fields.company}</span>
                    </div>
                  )}
                </div>

                {/* Informações adicionais */}
                {director.fields.bio && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Biografia:</p>
                    <p className="text-xs text-gray-600 text-center">
                      {director.fields.bio}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
