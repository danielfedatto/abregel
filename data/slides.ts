export interface HeroSlide {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    href: string;
  };
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'sindicato-forte',
    type: 'image',
    src: '/img/hero-1.jpg',
    title: 'Fortalecendo o Setor Industrial',
    subtitle: 'Unidos pela excelência, representação e crescimento sustentável da indústria brasileira.',
    cta: {
      text: 'Conheça Nossa História',
      href: '/quem-somos'
    }
  },
  {
    id: 'inovacao-tecnologia',
    type: 'video',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: '/img/hero-2.jpg',
    title: 'Inovação e Tecnologia',
    subtitle: 'Capacitação contínua e acesso às mais avançadas tecnologias do setor industrial.',
    cta: {
      text: 'Nossos Serviços',
      href: '/servicos'
    }
  },
  {
    id: 'networking-parcerias',
    type: 'image',
    src: '/img/hero-3.jpg',
    title: 'Networking e Parcerias',
    subtitle: 'Conectando empresas, criando oportunidades e construindo o futuro da indústria.',
    cta: {
      text: 'Faça Parte',
      href: '/contato'
    }
  }
];