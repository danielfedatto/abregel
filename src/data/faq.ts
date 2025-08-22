export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faq: FAQ[] = [
  { 
    id: 'associacao',
    question: 'Como me associar ao sindicato?', 
    answer: 'Preencha o formulário em nossa página de Contato e nossa equipe retornará com os próximos passos. O processo inclui análise da documentação, aprovação pelo conselho e formalização da associação.' 
  },
  { 
    id: 'beneficios',
    question: 'Quais os benefícios da associação?', 
    answer: 'Os associados têm acesso exclusivo a eventos do setor, programas de capacitação, consultoria especializada, representação institucional, networking qualificado e descontos em serviços parceiros.' 
  },
  { 
    id: 'planos',
    question: 'Há planos por porte da empresa?', 
    answer: 'Sim, oferecemos três categorias: pequenas empresas, médias empresas e grandes corporações. Cada categoria possui benefícios e valores diferenciados, adequados ao porte e necessidades específicas.' 
  },
  { 
    id: 'eventos',
    question: 'Como divulgar eventos na plataforma?', 
    answer: 'Envie seu material e informações via formulário de Contato. Nossa equipe de curadoria avalia a relevância para o setor e publica no calendário oficial de eventos.' 
  },
  { 
    id: 'certificados',
    question: 'Emitimos certificados de cursos?', 
    answer: 'Sim, emitimos certificados oficiais para todos os cursos e workshops promovidos pelo sindicato. Os certificados são reconhecidos no setor e podem ser utilizados para desenvolvimento profissional.' 
  },
  { 
    id: 'parcerias',
    question: 'Como se tornar um parceiro oficial?', 
    answer: 'Consulte nossa página de Parcerias para conhecer os requisitos e benefícios. Preencha o formulário específico e nossa equipe avaliará a proposta de parceria.' 
  },
];