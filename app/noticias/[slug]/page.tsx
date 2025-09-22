import { notFound } from 'next/navigation';
import { NewsPost } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import ExtractRichText from '@/components/ExtractRichText';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';

interface NewsPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Função para buscar o post pelo slug
async function getNewsPost(slug: string): Promise<NewsPost | null> {
  try {
    // Verificar se as variáveis de ambiente estão disponíveis
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
      throw new Error('Variáveis de ambiente do Contentful não encontradas');
    }

    const { createClient } = await import('contentful');
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const entries = await client.getEntries({
      content_type: 'newsPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) {
      return null;
    }

    return entries.items[0] as unknown as NewsPost;
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return null;
  }
}

// Função para gerar metadata dinâmica
export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'O post solicitado não foi encontrado.',
    };
  }

  return {
    title: `${post.fields.title} | Sindicato Industrial`,
    description: post.fields.excerpt,
    openGraph: {
      title: post.fields.title,
      description: post.fields.excerpt,
      images: post.fields.featuredImage ? [
        {
          url: getImageUrl(post.fields.featuredImage),
          width: 1200,
          height: 630,
          alt: post.fields.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.fields.title,
      description: post.fields.excerpt,
      images: post.fields.featuredImage ? [getImageUrl(post.fields.featuredImage)] : [],
    },
  };
}

// Função para gerar paths estáticos (opcional, para melhor performance)
export async function generateStaticParams() {
  try {
    // Verificar se as variáveis de ambiente estão disponíveis
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
      return [];
    }

    const { createClient } = await import('contentful');
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    const entries = await client.getEntries({
      content_type: 'newsPost',
      limit: 1000,
    });

    return entries.items.map((post) => ({
      slug: (post as unknown as NewsPost).fields.slug,
    }));
  } catch (error) {
    console.error('Erro ao gerar paths estáticos:', error);
    return [];
  }
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) {
    notFound();
  }

  const publishDate = new Date(post.fields.publishDate).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header da página */}
      <div className="relative py-12 md:py-16 pt-24 md:pt-32 overflow-hidden">
        {/* Imagem de fundo com blur */}
        <div className="absolute inset-0">
          {post.fields.featuredImage ? (
            <>
              <img
                src={getImageUrl(post.fields.featuredImage)}
                alt={post.fields.title}
                className="aspect-[4/5] md:block w-full h-full object-cover scale-110 md:scale-125 blur-xl md:blur-3xl brightness-75"
              />
              
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/80 to-secondary/80"></div>
          )}
        </div>
        
        {/* Conteúdo do header */}
        <div className="relative z-10 container-section">
            {/* Breadcrumb */}
            <nav className="mb-6 md:mb-8">
              <Link 
                href="/noticias" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 text-sm md:text-base"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Voltar para Notícias
              </Link>
            </nav>

            {/* Categoria */}
            {post.fields.category && (
              <div className="mb-3 md:mb-4">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                  <Tag className="h-3 w-3 mr-1" />
                  {post.fields.category}
                </span>
              </div>
            )}

            {/* Título */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
              {post.fields.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed drop-shadow-md">
              {post.fields.excerpt}
            </p>

            {/* Meta informações */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs sm:text-sm text-white/80">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {publishDate}
              </div>
              {post.fields.author && (
                <div className="flex items-center">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  {post.fields.author}
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="py-8 md:py-16">
        <div className="container-section">
            {/* Imagem destacada */}
            <div className="mb-8 md:mb-12">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl">
                {post.fields.featuredImage ? (
                  <img
                    src={getImageUrl(post.fields.featuredImage)}
                    alt={post.fields.title}
                    className="w-full h-48 sm:h-64 md:h-96 lg:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-64 md:h-96 lg:h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      <p className="text-muted-foreground font-medium text-sm sm:text-base">Imagem da Notícia</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Conteúdo do post */}
            <article className="max-w-none rich-text-content text-foreground leading-relaxed break-words overflow-wrap-anywhere">
              <ExtractRichText richText={post.fields.content as any} />
            </article>

            {/* Tags */}
            {post.fields.tags && post.fields.tags.length > 0 && (
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.fields.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navegação */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
              <Link 
                href="/noticias" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 text-sm md:text-base"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Ver todas as notícias
              </Link>
            </div>
        </div>
      </div>
      
      <ContentfulFooter />
    </div>
  );
}
