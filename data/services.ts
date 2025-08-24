export interface Service {
  id: string;
  icon: string;
  title: string;
  desc: string;
  href: string;
}

export const services: Service[] = [
  { 
    id: 'defesa', 
    icon: 'Shield', 
    title: 'Defesa Setorial', 
    desc: 'Atuação institucional junto a órgãos e reguladores para proteção dos interesses do setor.',
    href: '/servicos#defesa'
  },
  { 
    id: 'capacitacao', 
    icon: 'GraduationCap', 
    title: 'Capacitação', 
    desc: 'Treinamentos e workshops especializados para desenvolvimento profissional.',
    href: '/servicos#capacitacao'
  },
  { 
    id: 'consultoria', 
    icon: 'Lightbulb', 
    title: 'Consultoria', 
    desc: 'Estratégia e orientação especializada para o crescimento do associado.',
    href: '/servicos#consultoria'
  },
  { 
    id: 'networking', 
    icon: 'Users', 
    title: 'Networking', 
    desc: 'Conexão entre empresas e lideranças do setor para oportunidades de negócio.',
    href: '/servicos#networking'
  },
  { 
    id: 'eventos', 
    icon: 'Calendar', 
    title: 'Eventos', 
    desc: 'Calendário anual com tendências, inovações e oportunidades do setor.',
    href: '/servicos#eventos'
  },
  { 
    id: 'advocacy', 
    icon: 'Megaphone', 
    title: 'Advocacy', 
    desc: 'Representação ativa em pautas prioritárias junto ao poder público.',
    href: '/servicos#advocacy'
  },
];