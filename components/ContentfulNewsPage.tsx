'use client';

import { useContentful } from '@/hooks/use-contentful';
import { NewsPost } from '@/types/contentful';
import { getImageUrl, formatContentfulDate } from '@/lib/contentful';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContentfulNewsPage() {
  const { data: newsPosts, loading, error } = useContentful<NewsPost>('newsPost', {
    limit: 100, // Mostrar todas as notícias na página
    order: ['-fields.publishDate'],
  });

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Carregando notícias...</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <article key={i} className="group bg-card rounded-2xl overflow-hidden card-hover border border-border/50 animate-pulse">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                  <div className="absolute top-4 left-4">
                    <div className="bg-muted-foreground/20 px-3 py-1 rounded-full text-sm font-medium w-16 h-6"></div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <div className="h-4 w-4 mr-2 bg-muted-foreground/20 rounded"></div>
                    <div className="h-4 w-24 bg-muted-foreground/20 rounded"></div>
                  </div>
                  
                  <div className="h-6 bg-muted-foreground/20 rounded mb-3"></div>
                  <div className="h-6 bg-muted-foreground/20 rounded mb-3 w-4/5"></div>
                  
                  <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-4 w-3/4"></div>
                  
                  <div className="h-4 bg-muted-foreground/20 rounded w-20"></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !newsPosts || newsPosts.length === 0) {
    return (
      <section className="section-padding">
        <div className="container-section text-center">
          <h2 className="section-title">Nenhuma notícia encontrada</h2>
          <p className="section-subtitle">
            Verifique o Contentful ou tente novamente mais tarde.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">Todas as Notícias</h2>
          <p className="section-subtitle">
            {newsPosts.length} notícia{newsPosts.length !== 1 ? 's' : ''} encontrada{newsPosts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPosts.map((post) => (
            <article key={post.sys.id} className="group bg-card rounded-2xl overflow-hidden card-hover border border-border/50">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {post.fields.featuredImage ? (
                  <img
                    src={getImageUrl(post.fields.featuredImage)}
                    alt={post.fields.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                )}
                {post.fields.category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {post.fields.category}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-muted-foreground text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {post.fields.publishDate && formatContentfulDate(post.fields.publishDate)}
                </div>
                
                <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.fields.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {post.fields.excerpt}
                </p>
                
                <Link 
                  href={`/noticias/${post.fields.slug}`}
                  className="inline-flex items-center text-primary font-medium link-hover group-hover:text-primary-700 transition-colors duration-300"
                >
                  Ler mais
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {newsPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma notícia disponível no momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
