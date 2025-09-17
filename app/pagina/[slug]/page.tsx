import { notFound } from 'next/navigation';
import { DynamicPage } from '@/types/contentful';
import { extractRichText, getImageUrl } from '@/lib/contentful';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';

interface DynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Função para buscar a página pelo slug
async function getDynamicPage(slug: string): Promise<DynamicPage | null> {
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
      content_type: '2afbZgYQejkBU3antCJzGn',
      'fields.slug': slug,
      limit: 1,
    });

    if (entries.items.length === 0) {
      return null;
    }

    return entries.items[0] as unknown as DynamicPage;
  } catch (error) {
    console.error('Erro ao buscar página:', error);
    return null;
  }
}

// Função para gerar metadata dinâmica
export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDynamicPage(slug);

  if (!page) {
    return {
      title: 'Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
    };
  }

  const title = page.fields.seoTitle || page.fields.title;
  const description = page.fields.seoDescription || page.fields.excerpt || '';

  return {
    title: `${title} | Sindicato Industrial`,
    description,
    openGraph: {
      title,
      description,
      images: page.fields.featuredImage ? [
        {
          url: getImageUrl(page.fields.featuredImage),
          width: 1200,
          height: 630,
          alt: page.fields.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: page.fields.featuredImage ? [getImageUrl(page.fields.featuredImage)] : [],
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
      content_type: '2afbZgYQejkBU3antCJzGn',
      limit: 1000,
    });

    return entries.items.map((page) => ({
      slug: (page as unknown as DynamicPage).fields.slug,
    }));
  } catch (error) {
    console.error('Erro ao gerar paths estáticos:', error);
    return [];
  }
}

export default async function DynamicPageComponent({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = await getDynamicPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header da página */}
      <div className="relative py-12 md:py-16 pt-24 md:pt-32 overflow-hidden">
        {/* Imagem de fundo com blur */}
        <div className="absolute inset-0">
          {page.fields.featuredImage ? (
            <>
              <img
                src={getImageUrl(page.fields.featuredImage)}
                alt={page.fields.title}
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
              href="/" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 text-sm md:text-base"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Voltar para Home
            </Link>
          </nav>

          {/* Título */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
            {page.fields.title}
          </h1>

          {/* Excerpt */}
          {page.fields.excerpt && (
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed drop-shadow-md">
              {page.fields.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="py-8 md:py-16">
        <div className="container-section">
          {/* Imagem destacada */}
          {page.fields.featuredImage && (
            <div className="mb-8 md:mb-12">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl">
                <img
                  src={getImageUrl(page.fields.featuredImage)}
                  alt={page.fields.title}
                  className="w-full h-48 sm:h-64 md:h-96 lg:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          )}

          {/* Conteúdo da página */}
          <article className="max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: extractRichText(page.fields.content) 
              }} 
              className="rich-text-content text-foreground leading-relaxed break-words overflow-wrap-anywhere"
              style={{
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
                hyphens: 'auto'
              }}
            />
          </article>

          {/* Navegação */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <Link 
              href="/" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 text-sm md:text-base"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
      
      <ContentfulFooter />
    </div>
  );
}
