export interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  cover: string;
  excerpt: string;
  content?: string;
}

export const posts: Post[] = [
  { 
    slug: 'forum-industrial-2025', 
    title: 'Fórum Industrial 2025: Inovação e Sustentabilidade', 
    date: '2025-10-15', 
    tag: 'Evento', 
    cover: '/img/post1.jpg',
    excerpt: 'Participe do maior evento do setor industrial em 2025, focado em inovação tecnológica e práticas sustentáveis.',
    content: 'O Fórum Industrial 2025 promete ser um marco...'
  },
  { 
    slug: 'workshop-exportacao', 
    title: 'Workshop de Exportação: Novos Mercados', 
    date: '2025-11-22', 
    tag: 'Capacitação', 
    cover: '/img/post2.jpg',
    excerpt: 'Aprenda as melhores práticas para expandir seus negócios no mercado internacional.',
    content: 'Este workshop abordará as principais estratégias...'
  },
  { 
    slug: 'encontro-networking', 
    title: 'Encontro de Networking Empresarial', 
    date: '2025-12-10', 
    tag: 'Networking', 
    cover: '/img/post3.jpg',
    excerpt: 'Conecte-se com líderes do setor e explore novas oportunidades de parceria.',
    content: 'O networking é fundamental para o crescimento...'
  },
  { 
    slug: 'regulamentacao-setor', 
    title: 'Nova Regulamentação do Setor: O que Muda', 
    date: '2025-09-08', 
    tag: 'Regulamentação', 
    cover: '/img/post4.jpg',
    excerpt: 'Entenda as principais mudanças na nova regulamentação e como se adequar.',
    content: 'A nova regulamentação traz importantes mudanças...'
  },
  { 
    slug: 'sustentabilidade-empresarial', 
    title: 'Sustentabilidade Empresarial em Foco', 
    date: '2025-08-25', 
    tag: 'Sustentabilidade', 
    cover: '/img/post5.jpg',
    excerpt: 'Descubra como implementar práticas sustentáveis que geram valor para seu negócio.',
    content: 'A sustentabilidade deixou de ser tendência...'
  },
  { 
    slug: 'digitalização-processos', 
    title: 'Digitalização de Processos Industriais', 
    date: '2025-07-30', 
    tag: 'Tecnologia', 
    cover: '/img/post6.jpg',
    excerpt: 'A transformação digital está revolucionando a indústria. Saiba como participar.',
    content: 'A digitalização dos processos industriais...'
  },
];