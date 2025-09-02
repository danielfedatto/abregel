import { ContentfulImage, ContentfulAsset } from '@/lib/contentful';

// Tipo base para todas as entradas do Contentful
export interface ContentfulEntry {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    contentType: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
  };
  fields: Record<string, any>;
}

// Tipo para Hero Slides
export interface HeroSlide extends ContentfulEntry {
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

// Tipo para Serviços
export interface Service extends ContentfulEntry {
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

// Tipo para Parceiros
export interface Partner extends ContentfulEntry {
  fields: {
    name: string;
    logo: ContentfulImage;
    website?: string;
    description?: string;
    category?: string;
    order: number;
  };
}

// Tipo para Notícias
export interface NewsPost extends ContentfulEntry {
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

// Tipo para FAQ
export interface FAQItem extends ContentfulEntry {
  fields: {
    question: string;
    answer: any; // Rich Text
    category?: string;
    order: number;
  };
}

// Tipo para Planos de Preço
export interface PricingPlan extends ContentfulEntry {
  fields: {
    name: string;
    price: number;
    currency: string;
    period: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    order: number;
    ctaText: string;
    ctaLink?: string;
  };
}

// Tipo para Depoimentos
export interface Testimonial extends ContentfulEntry {
  fields: {
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: ContentfulImage;
    rating?: number;
    order: number;
  };
}

// Tipo para Diretoria
export interface Director extends ContentfulEntry {
  fields: {
    name: string;
    role: string;
    company: string;
    bio?: string;
    photo?: ContentfulImage;
    order: number;
  };
}

// Tipo para Configurações do Site
export interface SiteSettings extends ContentfulEntry {
  fields: {
    siteTitle: string;
    siteDescription: string;
    logo: ContentfulImage;
    logoWhite?: ContentfulImage;
    favicon?: ContentfulImage;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    socialLinks: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
    newsletterTitle?: string;
    newsletterDescription?: string;
  };
}

// Tipo para Páginas
export interface Page extends ContentfulEntry {
  fields: {
    title: string;
    slug: string;
    content: any; // Rich Text
    seoTitle?: string;
    seoDescription?: string;
    featuredImage?: ContentfulImage;
    sections?: any[]; // Array de seções da página
  };
}

// Tipo para Seções de Página
export interface PageSection extends ContentfulEntry {
  fields: {
    title: string;
    type: string; // hero, content, gallery, cta, etc.
    content: any; // Rich Text ou dados específicos da seção
    order: number;
    settings?: Record<string, any>;
  };
}

// Tipo para Menu de Navegação
export interface NavigationMenu extends ContentfulEntry {
  fields: {
    name: string;
    items: {
      label: string;
      link: string;
      children?: {
        label: string;
        link: string;
        description?: string;
      }[];
    }[];
  };
}

// Tipo para Eventos
export interface Event extends ContentfulEntry {
  fields: {
    title: string;
    slug: string;
    description: string;
    startDate: string;
    endDate?: string;
    location?: string;
    image?: ContentfulImage;
    registrationRequired?: boolean;
    registrationLink?: string;
    category?: string;
  };
}

// Tipo para Downloads
export interface Download extends ContentfulEntry {
  fields: {
    title: string;
    description?: string;
    file: ContentfulAsset;
    category?: string;
    order: number;
    downloadCount?: number;
  };
}
