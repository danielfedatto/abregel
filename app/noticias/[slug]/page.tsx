import { notFound } from 'next/navigation';
import { createClient } from 'contentful';
import { NewsPost } from '@/types/contentful';
import { extractRichText, getImageUrl } from '@/lib/contentful';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';

// Configuração do cliente Contentful
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

interface NewsPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Função para buscar o post pelo slug
async function getNewsPost(slug: string): Promise<NewsPost | null> {
  try {
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
      <div className="bg-muted/30 py-16 pt-32">
        <div className="container-section">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link 
                href="/noticias" 
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Notícias
              </Link>
            </nav>

            {/* Categoria */}
            {post.fields.category && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  <Tag className="h-3 w-3 mr-1" />
                  {post.fields.category}
                </span>
              </div>
            )}

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.fields.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.fields.excerpt}
            </p>

            {/* Meta informações */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {publishDate}
              </div>
              {post.fields.author && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.fields.author}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="py-16">
        <div className="container-section">
          <div className="max-w-4xl mx-auto">
            {/* Imagem destacada */}
            {post.fields.featuredImage && (
              <div className="mb-12">
                <img
                  src={getImageUrl(post.fields.featuredImage)}
                  alt={post.fields.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}

            {/* Conteúdo do post */}
            <article className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: extractRichText(post.fields.content) 
                }} 
                className="text-foreground leading-relaxed"
              />
            </article>

            {/* Tags */}
            {post.fields.tags && post.fields.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.fields.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navegação */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link 
                href="/noticias" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Ver todas as notícias
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <ContentfulFooter />
    </div>
  );
}
