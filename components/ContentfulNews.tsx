'use client';

import { useContentful } from '@/hooks/use-contentful';
import { NewsPost } from '@/types/contentful';
import { getImageUrl, formatContentfulDate } from '@/lib/contentful';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContentfulNews() {
  const { data: newsPosts, loading, error } = useContentful<NewsPost>('newsPost', {
    limit: 3,
    order: ['-fields.publishDate'],
  });

  if (loading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="section-title mb-0">Últimas Notícias</h2>
              <p className="section-subtitle">
                Carregando notícias...
              </p>
            </div>
            <div className="mt-4 md:mt-0 btn-outline animate-pulse">
              Ver Todas as Notícias
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
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
      <section className="section-padding bg-muted/30">
        <div className="container-section text-center">
          <h2 className="section-title">Últimas Notícias</h2>
          <p className="section-subtitle">
            Nenhuma notícia encontrada. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="section-title mb-0">Últimas Notícias</h2>
            <p className="section-subtitle">
              Mantenha-se atualizado com as principais novidades do setor.
            </p>
          </div>
          <Link 
            href="/noticias" 
            className="mt-4 md:mt-0 btn-outline"
          >
            Ver Todas as Notícias
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPosts.map((post) => (
            <article key={post.sys.id} className="group bg-card rounded-2xl overflow-hidden card-hover border border-border/50">
              <div className="aspect-video bg-muted relative overflow-hidden">
                {post.fields.featuredImage ? (
                  <Link 
                    href={`/noticias/${post.fields.slug}`}
                    className="block"
                    title={`Ir para ${post.fields.title}`}
                    aria-label={`Ir para ${post.fields.title}`}
                  >
                  <img
                    src={getImageUrl(post.fields.featuredImage)}
                    alt={post.fields.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  </Link>
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
                
                <Link 
                  href={`/noticias/${post.fields.slug}`}
                  className="block"
                  title={`Ir para ${post.fields.title}`}
                  aria-label={`Ir para ${post.fields.title}`}
                >
                  <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.fields.title}
                  </h3>
                </Link>
                
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
      </div>
    </section>
  );
}
