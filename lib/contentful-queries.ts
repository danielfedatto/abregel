import { contentfulClient } from './contentful';
import { 
  HeroSlide, 
  Service, 
  Partner, 
  NewsPost, 
  FAQItem, 
  PricingPlan, 
  Testimonial, 
  Director,
  SiteSettings,
  Page,
  Event,
  Download
} from '@/types/contentful';

// Funções para buscar dados específicos

// Hero Slides
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'heroSlide',
      order: ['fields.order'],
      include: 2,
    });
    return response.items as unknown as HeroSlide[];
  } catch (error) {
    console.error('Erro ao buscar hero slides:', error);
    return [];
  }
}

// Serviços
export async function getServices(): Promise<Service[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'service',
      order: ['fields.order'],
      include: 2,
    });
    return response.items as unknown as Service[];
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    return [];
  }
}

// Parceiros
export async function getPartners(): Promise<Partner[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'partner',
      order: ['fields.order'],
      include: 2,
    });
    return response.items as unknown as Partner[];
  } catch (error) {
    console.error('Erro ao buscar parceiros:', error);
    return [];
  }
}

// Notícias
export async function getNewsPosts(limit: number = 10): Promise<NewsPost[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'newsPost',
      order: ['-fields.publishDate'],
      limit,
      include: 2,
    });
    return response.items as unknown as NewsPost[];
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
}

// Notícia por slug
export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'newsPost',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    });
    return (response.items[0] as unknown as NewsPost) || null;
  } catch (error) {
    console.error(`Erro ao buscar notícia ${slug}:`, error);
    return null;
  }
}

// FAQ
export async function getFAQItems(category?: string): Promise<FAQItem[]> {
  try {
    const query: any = {
      content_type: 'faqItem',
      order: ['fields.order'],
      include: 2,
    };

    if (category) {
      query['fields.category'] = category;
    }

    const response = await contentfulClient.getEntries(query);
    return response.items as unknown as FAQItem[];
  } catch (error) {
    console.error('Erro ao buscar FAQ:', error);
    return [];
  }
}

// Planos de Preço
export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'pricingPlan',
      order: ['fields.order'],
      include: 2,
    });
    return response.items as unknown as PricingPlan[];
  } catch (error) {
    console.error('Erro ao buscar planos de preço:', error);
    return [];
  }
}

// Depoimentos
export async function getTestimonials(limit: number = 6): Promise<Testimonial[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'testimonial',
      order: ['fields.order'],
      limit,
      include: 2,
    });
    return response.items as unknown as Testimonial[];
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return [];
  }
}

// Diretoria
export async function getDirectors(): Promise<Director[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'director',
      order: ['fields.order'],
      include: 2,
    });
    return response.items as unknown as Director[];
  } catch (error) {
    console.error('Erro ao buscar diretoria:', error);
    return [];
  }
}

// Configurações do Site
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'siteSettings',
      limit: 1,
      include: 2,
    });
    return (response.items[0] as unknown as SiteSettings) || null;
  } catch (error) {
    console.error('Erro ao buscar configurações do site:', error);
    return null;
  }
}

// Página por slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    });
    return (response.items[0] as unknown as Page) || null;
  } catch (error) {
    console.error(`Erro ao buscar página ${slug}:`, error);
    return null;
  }
}

// Eventos
export async function getEvents(limit: number = 10): Promise<Event[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'event',
      order: ['fields.startDate'],
      limit,
      include: 2,
    });
    return response.items as unknown as Event[];
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return [];
  }
}

// Downloads
export async function getDownloads(category?: string): Promise<Download[]> {
  try {
    const query: any = {
      content_type: 'download',
      order: ['fields.order'],
      include: 2,
    };

    if (category) {
      query['fields.category'] = category;
    }

    const response = await contentfulClient.getEntries(query);
    return response.items as unknown as Download[];
  } catch (error) {
    console.error('Erro ao buscar downloads:', error);
    return [];
  }
}

// Busca por texto
export async function searchContent(query: string, contentType?: string): Promise<any[]> {
  try {
    const searchQuery: any = {
      query,
      include: 2,
      limit: 20,
    };

    if (contentType) {
      searchQuery.content_type = contentType;
    }

    const response = await contentfulClient.getEntries(searchQuery);
    return response.items;
  } catch (error) {
    console.error('Erro na busca:', error);
    return [];
  }
}

// Busca por tags
export async function getContentByTags(tags: string[], contentType?: string): Promise<any[]> {
  try {
    const query: any = {
      'metadata.tags.sys.id[in]': tags.join(','),
      include: 2,
      limit: 20,
    };

    if (contentType) {
      query.content_type = contentType;
    }

    const response = await contentfulClient.getEntries(query);
    return response.items;
  } catch (error) {
    console.error('Erro ao buscar por tags:', error);
    return [];
  }
}
