export interface Partner {
  name: string;
  logo: string;
  website?: string;
}

export const partners: Partner[] = [
  { name: 'Empresa Alpha', logo: '/logos/alpha.svg', website: 'https://alpha.com.br' },
  { name: 'Beta Corporation', logo: '/logos/beta.svg', website: 'https://beta.com.br' },
  { name: 'Gamma Industries', logo: '/logos/gamma.svg', website: 'https://gamma.com.br' },
  { name: 'Delta Solutions', logo: '/logos/delta.svg', website: 'https://delta.com.br' },
  { name: 'Epsilon Group', logo: '/logos/epsilon.svg', website: 'https://epsilon.com.br' },
  { name: 'Zeta Enterprises', logo: '/logos/zeta.svg', website: 'https://zeta.com.br' },
  { name: 'Eta Partners', logo: '/logos/eta.svg', website: 'https://eta.com.br' },
  { name: 'Theta Corp', logo: '/logos/theta.svg', website: 'https://theta.com.br' },
];