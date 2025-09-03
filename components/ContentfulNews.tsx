'use client';

import { useContentful } from '@/hooks/use-contentful';
import { NewsPost } from '@/types/contentful';
import { getImageUrl, formatContentfulDate, extractRichText } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

export default function ContentfulNews() {
  const { data: newsPosts, loading, error } = useContentful<NewsPost>('newsPost', {
    limit: 6,
    order: ['-fields.publishDate'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Últimas Notícias
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando notícias...
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

  if (error || !newsPosts || newsPosts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Últimas Notícias
          </h2>
          <p className="text-lg text-gray-600">
            Nenhuma notícia encontrada. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Últimas Notícias
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fique por dentro das novidades e acontecimentos importantes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPosts.map((post) => (
            <Card key={post.sys.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Imagem da notícia */}
              {post.fields.featuredImage && (
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(post.fields.featuredImage)}
                    alt={post.fields.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.fields.category && (
                    <Badge className="absolute top-4 left-4 bg-primary-500 text-white">
                      {post.fields.category}
                    </Badge>
                  )}
                </div>
              )}

              <CardHeader className="pb-4">
                {/* Meta informações */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  {post.fields.publishDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatContentfulDate(post.fields.publishDate)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>5 min</span>
                  </div>
                </div>

                {/* Título */}
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                  {post.fields.title}
                </CardTitle>

                {/* Autor */}
                {post.fields.author && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{post.fields.author}</span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                {/* Resumo */}
                {post.fields.excerpt && (
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                    {post.fields.excerpt}
                  </CardDescription>
                )}

                {/* Tags */}
                {post.fields.tags && post.fields.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.fields.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Botão de leitura */}
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300"
                >
                  Ler mais
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botão para ver todas as notícias */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3"
          >
            Ver todas as notícias
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
