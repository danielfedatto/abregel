// Configuração centralizada para os componentes Contentful
export const contentfulConfig = {
  // Configurações dos componentes
  components: {
    heroSlider: {
      limit: 10,
      order: ['fields.order'],
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    },
    services: {
      limit: 6,
      order: ['fields.order'],
    },
    partners: {
      limit: 12,
      order: ['fields.order'],
    },
    testimonials: {
      limit: 6,
      order: ['fields.order'],
    },
    faq: {
      limit: 20,
      order: ['fields.order'],
    },
    pricingPlans: {
      limit: 6,
      order: ['fields.order'],
    },
    news: {
      limit: 6,
      order: ['-fields.publishDate'],
    },
    directors: {
      limit: 12,
      order: ['fields.order'],
    },
    events: {
      limit: 6,
      order: ['fields.startDate'],
    },
    downloads: {
      limit: 12,
      order: ['-fields.uploadDate'],
    },
    pages: {
      limit: 12,
      order: ['-fields.lastModified'],
    },
    pageSections: {
      limit: 20,
      order: ['fields.order'],
    },
    navigationMenus: {
      limit: 10,
      order: ['fields.order'],
    },
  },

  // Configurações de cache
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 minutos
    localStorage: true,
  },

  // Configurações de imagens
  images: {
    defaultQuality: 80,
    defaultFormat: 'webp',
    responsive: {
      mobile: 768,
      tablet: 1024,
      desktop: 1920,
    },
  },

  // Configurações de rich text
  richText: {
    maxLength: 200,
    allowedTags: ['p', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },

  // Configurações de loading
  loading: {
    skeletonRows: 3,
    skeletonCards: 6,
    animationDuration: 300,
  },

  // Configurações de erro
  error: {
    showFallback: true,
    fallbackMessage: 'Conteúdo não disponível no momento. Tente novamente mais tarde.',
    retryAttempts: 3,
  },
};

// Tipos para as configurações
export type ContentfulComponentConfig = keyof typeof contentfulConfig.components;
export type ContentfulConfig = typeof contentfulConfig;

// Função helper para obter configuração de um componente
export function getComponentConfig(componentName: ContentfulComponentConfig) {
  return contentfulConfig.components[componentName];
}

// Função helper para obter configuração de cache
export function getCacheConfig() {
  return contentfulConfig.cache;
}

// Função helper para obter configuração de imagens
export function getImageConfig() {
  return contentfulConfig.images;
}

