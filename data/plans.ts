export type PlanFeature = {
  id: string;
  text: string;
  included: boolean;
};

export type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: PlanFeature[];
  cta: {
    text: string;
    href: string;
  };
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    description: 'Ideal para pequenas empresas iniciando no setor',
    price: 'R$ 150',
    period: 'por mês',
    features: [
      { id: 'f1', text: 'Representação sindical básica', included: true },
      { id: 'f2', text: 'Acesso a eventos mensais', included: true },
      { id: 'f3', text: 'Newsletter semanal', included: true },
      { id: 'f4', text: 'Suporte por email', included: true },
      { id: 'f5', text: 'Consultoria especializada', included: false },
      { id: 'f6', text: 'Capacitação gratuita', included: false },
      { id: 'f7', text: 'Networking exclusivo', included: false },
    ],
    cta: {
      text: 'Começar Agora',
      href: '/contato',
    },
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Perfeito para empresas em crescimento',
    price: 'R$ 350',
    period: 'por mês',
    popular: true,
    features: [
      { id: 'f1', text: 'Representação sindical completa', included: true },
      { id: 'f2', text: 'Acesso a eventos mensais', included: true },
      { id: 'f3', text: 'Newsletter semanal', included: true },
      { id: 'f4', text: 'Suporte prioritário', included: true },
      { id: 'f5', text: 'Consultoria especializada', included: true },
      { id: 'f6', text: 'Capacitação gratuita', included: true },
      { id: 'f7', text: 'Networking exclusivo', included: false },
    ],
    cta: {
      text: 'Escolher Profissional',
      href: '/contato',
    },
  },
  {
    id: 'enterprise',
    name: 'Empresarial',
    description: 'Solução completa para grandes empresas',
    price: 'R$ 750',
    period: 'por mês',
    features: [
      { id: 'f1', text: 'Representação sindical completa', included: true },
      { id: 'f2', text: 'Acesso a eventos mensais', included: true },
      { id: 'f3', text: 'Newsletter semanal', included: true },
      { id: 'f4', text: 'Suporte dedicado 24/7', included: true },
      { id: 'f5', text: 'Consultoria especializada', included: true },
      { id: 'f6', text: 'Capacitação gratuita', included: true },
      { id: 'f7', text: 'Networking exclusivo', included: true },
    ],
    cta: {
      text: 'Falar com Consultor',
      href: '/contato',
    },
  },
];
