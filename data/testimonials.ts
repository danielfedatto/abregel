export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string; // path under /public
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'O Sindicato foi fundamental para ampliar nosso networking e destravar pautas importantes para o setor.',
    name: 'Mariana Souza',
    role: 'CEO, Indústria Alpha',
    image: '/assets/placeholder.svg',
  },
  {
    id: 't2',
    quote:
      'Encontramos suporte técnico e representação institucional que fizeram a diferença no nosso crescimento.',
    name: 'Carlos Pereira',
    role: 'Diretor, Fábrica Beta',
    image: '/assets/placeholder.svg',
  },
  {
    id: 't3',
    quote:
      'A capacitação promovida elevou o nível do nosso time e aumentou a produtividade.',
    name: 'Ana Lima',
    role: 'Gerente Industrial, Gamma',
    image: '/assets/placeholder.svg',
  },
];
