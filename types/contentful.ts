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
    imageMobile?: ContentfulImage;
    video?: ContentfulImage;
    poster?: ContentfulImage;
    type: 'image' | 'video';
    ctaText?: string;
    ctaLink?: string;
    imageLink?: string; // Link para a imagem do slide
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

// Tipo para Seção Quem Somos
export interface AboutSection extends ContentfulEntry {
  fields: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    mission: string;
    vision: string;
    values: string;
    image?: ContentfulImage;
    order: number;
  };
}

// Tipo para Item de Número
export interface NumberItem extends ContentfulEntry {
  fields: {
    value: string;
    label: string;
    order: number;
  };
}

// Tipo para Seção de Números
export interface NumbersSection extends ContentfulEntry {
  fields: {
    title: string;
    subtitle: string;
    numbers: NumberItem[];
    order: number;
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

// Tipo para CTA Section
export interface CtaSection extends ContentfulEntry {
  fields: {
    title: string;
    subtitle?: string;
    description?: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: ContentfulImage;
    backgroundColor?: 'primary' | 'secondary' | 'accent' | 'muted' | 'gradient';
    textColor?: 'white' | 'black' | 'primary' | 'secondary';
    order: number;
  };
}

// Tipo para Navigation Link
export interface NavigationLink extends ContentfulEntry {
  fields: {
    name: string;
    href: string;
    order: number;
  };
}

// Tipo para Social Link
export interface SocialLink extends ContentfulEntry {
  fields: {
    name: string;
    href: string;
    platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'tiktok';
    order: number;
  };
}

// Tipo para Footer
export interface Footer extends ContentfulEntry {
  fields: {
    title: string;
    description: string;
    logo?: ContentfulImage;
    address: string;
    phone: string;
    email: string;
    institutionalLinks?: NavigationLink[];
    serviceLinks?: NavigationLink[];
    socialLinks?: SocialLink[];
    copyright: string;
    legalLinks?: NavigationLink[];
    order: number;
  };
}

// Tipo para Informações de Contato
export interface ContactInfo {
  address: {
    title: string;
    value: string;
    icon: string;
  };
  phone: {
    title: string;
    value: string;
    icon: string;
  };
  email: {
    title: string;
    value: string;
    icon: string;
  };
  hours: {
    title: string;
    value: string;
    icon: string;
  };
}

// Tipo para Página de Contato
export interface ContactPage extends ContentfulEntry {
  fields: {
    title: string;
    subtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    contactInfo: ContactInfo;
    formTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    emailRecipients: string[]; // Array de e-mails destinatários
    order: number;
  };
}
