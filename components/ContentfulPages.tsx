'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Page } from '@/types/contentful';
import { getImageUrl, extractRichText } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, ExternalLink, ArrowRight, Eye } from 'lucide-react';

export default function ContentfulPages() {
  const { data: pages, loading, error } = useContentful<Page>('page', {
    limit: 12,
    order: ['-fields.lastModified'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Páginas do Site
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando páginas...
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

  if (error || !pages || pages.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Páginas do Site
          </h2>
          <p className="text-lg text-gray-600">
            Nenhuma página encontrada. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  // Agrupar páginas por status (publicado/rascunho)
  const groupedPages = pages.reduce((acc, page) => {
    const status = page.fields.seoTitle ? 'Publicado' : 'Rascunho';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(page);
    return acc;
  }, {} as Record<string, Page[]>);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Páginas do Site
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore todas as páginas e seções do nosso website
          </p>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant="default"
            size="sm"
            className="bg-primary-500 hover:bg-primary-600"
          >
            Todas
          </Button>
          {Object.keys(groupedPages).map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              className="hover:bg-primary-50 hover:border-primary-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Páginas agrupadas por categoria */}
        {Object.entries(groupedPages).map(([category, categoryPages]) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPages.map((page) => (
                <Card key={page.sys.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Imagem da página */}
                  {page.fields.featuredImage && (
                    <div className="relative overflow-hidden">
                      <img
                        src={getImageUrl(page.fields.featuredImage)}
                        alt={page.fields.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                        Página
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    {/* Título */}
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                      {page.fields.title}
                    </CardTitle>

                    {/* Meta informações */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Página disponível</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Descrição */}
                    {page.fields.seoDescription && (
                      <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                        {page.fields.seoDescription}
                      </CardDescription>
                    )}

                    {/* Botões de ação */}
                    <div className="flex gap-2">
                      {page.fields.slug && (
                        <Button
                          size="sm"
                          className="flex-1 bg-primary-500 hover:bg-primary-600"
                          asChild
                        >
                          <a href={`/${page.fields.slug}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver página
                          </a>
                        </Button>
                      )}
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
                {pages.length}
              </div>
              <div className="text-gray-600">Total de páginas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {Object.keys(groupedPages).length}
              </div>
              <div className="text-gray-600">Categorias</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                                 {pages.length}
              </div>
              <div className="text-gray-600">Páginas publicadas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {pages.filter(p => !p.fields.seoTitle).length}
              </div>
              <div className="text-gray-600">Rascunhos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
