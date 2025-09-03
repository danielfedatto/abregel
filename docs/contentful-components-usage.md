# 🚀 Guia de Uso dos Componentes Contentful

Este documento explica como usar todos os 14 componentes que consomem dados do Contentful em seu projeto.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Componentes Disponíveis](#componentes-disponíveis)
3. [Como Usar](#como-usar)
4. [Configurações](#configurações)
5. [Exemplos de Uso](#exemplos-de-uso)
6. [Troubleshooting](#troubleshooting)

## 🌟 Visão Geral

Todos os componentes Contentful foram criados para substituir conteúdo estático por dados dinâmicos do CMS. Eles incluem:

- **Loading States**: Skeleton loaders durante o carregamento
- **Error Handling**: Tratamento de erros com fallbacks
- **Responsive Design**: Layout adaptável para todos os dispositivos
- **TypeScript**: Tipagem completa para type safety
- **Accessibility**: Suporte a leitores de tela e navegação por teclado

## 🧩 Componentes Disponíveis

### 1. **ContentfulHeroSlider**
- **Propósito**: Slider principal com slides do Contentful
- **Content Type**: `heroSlide`
- **Características**: Autoplay, navegação, paginação, efeitos de transição

### 2. **ContentfulServices**
- **Propósito**: Lista de serviços oferecidos
- **Content Type**: `service`
- **Características**: Grid responsivo, ícones, descrições, features

### 3. **ContentfulPartners**
- **Propósito**: Parceiros e colaboradores
- **Content Type**: `partner`
- **Características**: Logos, categorias, links para websites

### 4. **ContentfulTestimonials**
- **Propósito**: Depoimentos de clientes
- **Content Type**: `testimonial`
- **Características**: Avaliações, avatares, informações de contato

### 5. **ContentfulFAQ**
- **Propósito**: Perguntas frequentes
- **Content Type**: `faqItem`
- **Características**: Agrupamento por categoria, accordion expansível

### 6. **ContentfulPricingPlans**
- **Propósito**: Planos de preços
- **Content Type**: `pricingPlan`
- **Características**: Destaque para planos populares, features, CTAs

### 7. **ContentfulNews**
- **Propósito**: Notícias e artigos
- **Content Type**: `newsPost`
- **Características**: Imagens destacadas, categorias, tags, autores

### 8. **ContentfulDirectors**
- **Propósito**: Diretoria da organização
- **Content Type**: `director`
- **Características**: Fotos, informações de contato, redes sociais

### 9. **ContentfulEvents**
- **Propósito**: Eventos futuros e passados
- **Content Type**: `event`
- **Características**: Calendário, inscrições, localização, categorias

### 10. **ContentfulDownloads**
- **Propósito**: Arquivos para download
- **Content Type**: `download`
- **Características**: Categorização, tipos de arquivo, tamanhos, versões

### 11. **ContentfulSiteSettings**
- **Propósito**: Configurações gerais do site
- **Content Type**: `siteSettings`
- **Características**: Informações da organização, contatos, redes sociais

### 12. **ContentfulPages**
- **Propósito**: Páginas do site
- **Content Type**: `page`
- **Características**: Status de publicação, templates, categorias

### 13. **ContentfulPageSections**
- **Propósito**: Seções reutilizáveis
- **Content Type**: `pageSection`
- **Características**: Tipos de seção, configurações, templates

### 14. **ContentfulNavigationMenus**
- **Propósito**: Menus de navegação
- **Content Type**: `navigationMenu`
- **Características**: Estrutura hierárquica, localização, profundidade

## 🎯 Como Usar

### Importação Básica

```tsx
import ContentfulServices from '@/components/ContentfulServices';

export default function MyPage() {
  return (
    <div>
      <h1>Nossos Serviços</h1>
      <ContentfulServices />
    </div>
  );
}
```

### Uso com Configurações Personalizadas

```tsx
import ContentfulNews from '@/components/ContentfulNews';

export default function NewsPage() {
  return (
    <div>
      <h1>Notícias</h1>
      {/* O componente já vem com configurações otimizadas */}
      <ContentfulNews />
    </div>
  );
}
```

### Uso em Layouts Responsivos

```tsx
import ContentfulPartners from '@/components/ContentfulPartners';

export default function PartnersPage() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ContentfulPartners />
      </div>
    </section>
  );
}
```

## ⚙️ Configurações

### Configuração Centralizada

```tsx
import { getComponentConfig } from '@/lib/contentful-config';

// Obter configuração para um componente específico
const servicesConfig = getComponentConfig('services');
console.log(servicesConfig); // { limit: 6, order: ['fields.order'] }
```

### Configurações Disponíveis

- **limit**: Número máximo de itens a exibir
- **order**: Ordenação dos itens
- **where**: Filtros específicos
- **include**: Relacionamentos a incluir

## 📱 Exemplos de Uso

### Página Principal

```tsx
import ContentfulHeroSlider from '@/components/ContentfulHeroSlider';
import ContentfulServices from '@/components/ContentfulServices';
import ContentfulTestimonials from '@/components/ContentfulTestimonials';

export default function HomePage() {
  return (
    <div>
      <ContentfulHeroSlider />
      <ContentfulServices />
      <ContentfulTestimonials />
    </div>
  );
}
```

### Página de Serviços

```tsx
import ContentfulServices from '@/components/ContentfulServices';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Nossos Serviços
        </h1>
        <ContentfulServices />
      </div>
    </div>
  );
}
```

### Página de Eventos

```tsx
import ContentfulEvents from '@/components/ContentfulEvents';

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <ContentfulEvents />
    </div>
  );
}
```

## 🔧 Troubleshooting

### Problema: Componente não carrega dados

**Solução:**
1. Verifique se as variáveis de ambiente estão configuradas
2. Confirme se o Contentful está acessível
3. Verifique se existem entradas publicadas no Contentful

### Problema: Erro de tipo TypeScript

**Solução:**
1. Verifique se os tipos estão corretos em `types/contentful.ts`
2. Confirme se o hook `useContentful` está retornando o tipo correto
3. Verifique se as interfaces correspondem aos campos do Contentful

### Problema: Imagens não carregam

**Solução:**
1. Verifique se o domínio do Contentful está configurado no `next.config.js`
2. Confirme se as imagens estão publicadas no Contentful
3. Verifique se o campo `image` está sendo preenchido corretamente

### Problema: Rich Text não renderiza

**Solução:**
1. Use a função `extractRichText` para processar o conteúdo
2. Verifique se o campo está configurado como Rich Text no Contentful
3. Confirme se as tags HTML estão sendo permitidas

## 📚 Recursos Adicionais

- [Documentação da API do Contentful](https://www.contentful.com/developers/docs/)
- [Guia de Integração Contentful + Next.js](https://www.contentful.com/developers/docs/javascript/tutorials/using-contentful-with-next-js/)
- [Tipos TypeScript do Contentful](https://github.com/contentful/contentful.js)

## 🆘 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique os logs do console do navegador
2. Confirme se todas as dependências estão instaladas
3. Verifique se o Contentful está configurado corretamente
4. Consulte a documentação oficial do Contentful

---

**Nota**: Todos os componentes são otimizados para performance e incluem lazy loading, cache e tratamento de erros robusto.

