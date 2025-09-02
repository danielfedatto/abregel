# 🚀 Integração com Contentful

## 📋 Visão Geral

Esta integração permite que você gerencie todo o conteúdo do seu website através do Contentful, um CMS headless moderno e flexível. Com essa implementação, você pode:

- ✅ Gerenciar slides do hero banner
- ✅ Criar e editar serviços
- ✅ Adicionar parceiros e logos
- ✅ Publicar notícias e artigos
- ✅ Gerenciar FAQ e depoimentos
- ✅ Configurar planos de preço
- ✅ Personalizar configurações do site

## 🛠️ Instalação e Configuração

### **1. Dependências Instaladas**

```bash
bun add contentful contentful-management
```

### **2. Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
CONTENTFUL_ENVIRONMENT=master

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### **3. Configuração do Next.js**

O `next.config.js` foi atualizado para incluir:

```javascript
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net', 'downloads.ctfassets.net'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  },
};
```

## 🏗️ Estrutura da Integração

### **Arquivos Principais**

```
lib/
├── contentful.ts              # Cliente e utilitários básicos
├── contentful-queries.ts      # Funções de busca específicas
types/
├── contentful.ts              # Tipos TypeScript
hooks/
├── use-contentful.ts          # Hooks React personalizados
components/
├── ContentfulHeroSlider.tsx   # Slider usando dados do Contentful
```

## 📊 Modelos de Conteúdo

### **1. Hero Slide**
```typescript
interface HeroSlide {
  fields: {
    title: string;
    subtitle?: string;
    description?: string;
    image: ContentfulImage;
    video?: ContentfulImage;
    poster?: ContentfulImage;
    type: 'image' | 'video';
    ctaText?: string;
    ctaLink?: string;
    order: number;
  };
}
```

### **2. Serviço**
```typescript
interface Service {
  fields: {
    title: string;
    description: string;
    icon?: string;
    image?: ContentfulImage;
    features?: string[];
    order: number;
    slug: string;
  };
}
```

### **3. Notícia**
```typescript
interface NewsPost {
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: any; // Rich Text
    featuredImage?: ContentfulImage;
    author?: string;
    publishDate: string;
    tags?: string[];
    category?: string;
  };
}
```

## 🔧 Como Usar

### **1. Buscar Dados no Servidor (SSR)**

```typescript
import { getHeroSlides, getServices } from '@/lib/contentful-queries';

export default async function Page() {
  const [heroSlides, services] = await Promise.all([
    getHeroSlides(),
    getServices(),
  ]);

  return (
    <div>
      <ContentfulHeroSlider slides={heroSlides} />
      {/* Renderizar serviços */}
    </div>
  );
}
```

### **2. Usar Hooks no Cliente**

```typescript
import { useContentful } from '@/hooks/use-contentful';
import { Service } from '@/types/contentful';

export default function ServicesPage() {
  const { data: services, loading, error } = useContentful<Service>('service');

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {services.map(service => (
        <div key={service.sys.id}>
          <h3>{service.fields.title}</h3>
          <p>{service.fields.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### **3. Buscar Item Específico**

```typescript
import { useContentfulEntry } from '@/hooks/use-contentful';

export default function NewsPostPage({ postId }: { postId: string }) {
  const { data: post, loading, error } = useContentfulEntry<NewsPost>(postId);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!post) return <div>Post não encontrado</div>;

  return (
    <article>
      <h1>{post.fields.title}</h1>
      <p>{post.fields.excerpt}</p>
      {/* Renderizar conteúdo rico */}
    </article>
  );
}
```

## 🖼️ Gerenciamento de Imagens

### **Funções Utilitárias**

```typescript
import { getImageUrl, getImageUrlWithParams } from '@/lib/contentful';

// URL básica
const imageUrl = getImageUrl(image);

// URL com parâmetros de otimização
const optimizedUrl = getImageUrlWithParams(image, 800, 600, 80);
```

### **Otimizações Automáticas**

- ✅ Suporte a WebP e AVIF
- ✅ Redimensionamento automático
- ✅ Compressão de qualidade
- ✅ Lazy loading nativo

## 📝 Rich Text

### **Extrair Texto Simples**

```typescript
import { extractRichText } from '@/lib/contentful';

const plainText = extractRichText(richTextContent);
```

### **Renderizar Rich Text (Futuro)**

```typescript
// TODO: Implementar renderizador de Rich Text
import { renderRichText } from '@/lib/contentful';

const htmlContent = renderRichText(richTextContent);
```

## 🔍 Busca e Filtros

### **Busca por Texto**

```typescript
import { searchContent } from '@/lib/contentful-queries';

const results = await searchContent('palavra-chave', 'newsPost');
```

### **Filtros por Tags**

```typescript
import { getContentByTags } from '@/lib/contentful-queries';

const taggedContent = await getContentByTags(['tag1', 'tag2'], 'service');
```

## 🚀 Hooks Disponíveis

### **useContentful**
```typescript
const { data, loading, error } = useContentful('contentType', {
  limit: 10,
  order: 'fields.order',
  where: { 'fields.category': 'featured' }
});
```

### **useContentfulEntry**
```typescript
const { data, loading, error } = useContentfulEntry<Service>('entryId');
```

### **useContentfulWithCache**
```typescript
const { data, loading, error } = useContentfulWithCache(
  'contentType',
  'cache-key',
  { limit: 20 }
);
```

## 📱 Exemplo de Implementação

### **Página Principal com Contentful**

```typescript
// app/page.tsx
import { getHeroSlides, getServices } from '@/lib/contentful-queries';
import ContentfulHeroSlider from '@/components/ContentfulHeroSlider';

export default async function HomePage() {
  const [heroSlides, services] = await Promise.all([
    getHeroSlides(),
    getServices(),
  ]);

  return (
    <main>
      <ContentfulHeroSlider slides={heroSlides} />
      <ServicesSection services={services} />
    </main>
  );
}
```

### **Componente de Serviços**

```typescript
// components/ServicesSection.tsx
import { Service } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.sys.id} className="bg-white rounded-lg shadow-md p-6">
              {service.fields.image && (
                <img
                  src={getImageUrl(service.fields.image)}
                  alt={service.fields.image.fields.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{service.fields.title}</h3>
              <p className="text-gray-600">{service.fields.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 🔒 Segurança e Boas Práticas

### **1. Variáveis de Ambiente**
- ✅ Nunca commitar credenciais
- ✅ Usar `.env.local` para desenvolvimento
- ✅ Configurar variáveis no Vercel/Netlify

### **2. Validação de Dados**
- ✅ Sempre verificar se os dados existem
- ✅ Implementar fallbacks para erros
- ✅ Validar tipos com TypeScript

### **3. Cache e Performance**
- ✅ Implementar cache local quando apropriado
- ✅ Usar `include` para reduzir requisições
- ✅ Implementar lazy loading para imagens

## 🐛 Troubleshooting

### **Erro: "Cannot read properties of undefined"**
```typescript
// ❌ Erro comum
const title = slide.fields.title;

// ✅ Solução segura
const title = slide?.fields?.title || 'Título padrão';
```

### **Erro: "Image domain not allowed"**
Verifique se o domínio está configurado no `next.config.js`:
```javascript
images: {
  domains: ['images.ctfassets.net', 'downloads.ctfassets.net'],
}
```

### **Erro: "Access token invalid"**
- Verifique se `CONTENTFUL_ACCESS_TOKEN` está correto
- Confirme se o token tem permissões de leitura
- Verifique se o `SPACE_ID` está correto

## 📚 Recursos Adicionais

- [Contentful JavaScript SDK](https://contentful.github.io/contentful.js/)
- [Contentful Management API](https://www.contentful.com/developers/docs/references/content-management-api/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🚀 Próximos Passos

1. **Configurar variáveis de ambiente** ✅
2. **Criar modelos no Contentful** 🔄
3. **Migrar dados existentes** 📋
4. **Implementar Rich Text renderer** 📝
5. **Adicionar cache Redis** ⚡
6. **Implementar preview mode** 👁️

---

*Última atualização: $(date)*
*Versão: 1.0*
