'use client';

import { useContentful } from '@/hooks/use-contentful';
import { PageSection } from '@/types/contentful';
import { getImageUrl, extractRichText } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Image, Video, Code, ExternalLink, Eye, Settings } from 'lucide-react';

export default function ContentfulPageSections() {
  const { data: pageSections, loading, error } = useContentful<PageSection>('pageSection', {
    limit: 20,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Seções de Página
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando seções...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
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

  if (error || !pageSections || pageSections.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Seções de Página
          </h2>
          <p className="text-lg text-gray-600">
            Nenhuma seção encontrada. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  // Agrupar seções por tipo
  const groupedSections = pageSections.reduce((acc, section) => {
    const type = section.fields.type || 'Geral';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(section);
    return acc;
  }, {} as Record<string, PageSection[]>);

  // Função para obter o ícone baseado no tipo de seção
  const getSectionIcon = (sectionType: string) => {
    const type = sectionType.toLowerCase();
    if (type.includes('hero')) return <Image className="w-5 h-5" />;
    if (type.includes('text')) return <FileText className="w-5 h-5" />;
    if (type.includes('video')) return <Video className="w-5 h-5" />;
    if (type.includes('custom')) return <Code className="w-5 h-5" />;
    return <Settings className="w-5 h-5" />;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Seções de Página
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Componentes reutilizáveis para construir páginas dinâmicas
          </p>
        </div>

        {/* Filtros por tipo */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant="default"
            size="sm"
            className="bg-primary-500 hover:bg-primary-600"
          >
            Todas
          </Button>
          {Object.keys(groupedSections).map((type) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              className="hover:bg-primary-50 hover:border-primary-300"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Seções agrupadas por tipo */}
        {Object.entries(groupedSections).map(([type, typeSections]) => (
          <div key={type} className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {type}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typeSections.map((section) => (
                <Card key={section.sys.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    {/* Cabeçalho da seção */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                          {getSectionIcon(section.fields.type)}
                        </div>
                        <Badge variant="secondary">
                          {section.fields.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Título */}
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                      {section.fields.title}
                    </CardTitle>

                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Conteúdo da seção */}
                    {section.fields.content && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Conteúdo:</h4>
                        <div 
                          className="text-sm text-gray-600 line-clamp-3 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ 
                            __html: extractRichText(section.fields.content).substring(0, 150) + '...' 
                          }} 
                        />
                      </div>
                    )}

                    {/* Configurações da seção */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      {section.fields.order && (
                        <div className="flex items-center justify-between">
                          <span>Ordem:</span>
                          <span className="font-medium">{section.fields.order}</span>
                        </div>
                      )}
                    </div>

                    {/* Botões de ação */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                    </div>

                    {/* Metadados da seção */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                                           <div>
                     <span className="font-medium">Tipo:</span> {section.fields.type}
                   </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Estatísticas */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {pageSections.length}
              </div>
              <div className="text-gray-600">Total de seções</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {Object.keys(groupedSections).length}
              </div>
              <div className="text-gray-600">Tipos de seção</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                                 {pageSections.length}
              </div>
              <div className="text-gray-600">Seções ativas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {pageSections.filter(s => !s.fields.type).length}
              </div>
              <div className="text-gray-600">Seções inativas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
