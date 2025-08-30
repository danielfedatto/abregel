import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
// Using public assets in Next.js

const navigation = {
  institucional: [
    { name: 'Quem Somos', href: '/quem-somos' },
    { name: 'Missão e Valores', href: '/quem-somos#missao' },
    { name: 'Diretoria', href: '/quem-somos#diretoria' },
    { name: 'Transparência', href: '/transparencia' },
  ],
  servicos: [
    { name: 'Defesa Setorial', href: '/servicos#defesa' },
    { name: 'Capacitação', href: '/servicos#capacitacao' },
    { name: 'Consultoria', href: '/servicos#consultoria' },
    { name: 'Networking', href: '/servicos#networking' },
  ],
  recursos: [
    { name: 'Notícias', href: '/noticias' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Parcerias', href: '/parcerias' },
    { name: 'Downloads', href: '/downloads' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-section py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/assets/logo_footer.svg"
                alt="Sindicato Logo"
                className="h-32 lg:h-40 w-auto object-contain"
              />
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Representamos e defendemos os interesses do setor industrial, 
              promovendo o desenvolvimento sustentável e a competitividade 
              das empresas associadas através de serviços especializados.
            </p>

            {/* Contato */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent-400 flex-shrink-0" />
                <span className="text-gray-300">
                  Av. Industrial, 1234 - Centro Empresarial<br />
                  São Paulo, SP - CEP 01234-567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent-400 flex-shrink-0" />
                <span className="text-gray-300">(11) 3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent-400 flex-shrink-0" />
                <span className="text-gray-300">contato@sindicatoindustrial.org.br</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Institucional</h4>
            <ul className="space-y-3">
              {navigation.institucional.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-accent-400 transition-colors duration-300 link-hover"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Serviços</h4>
            <ul className="space-y-3">
              {navigation.servicos.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-accent-400 transition-colors duration-300 link-hover"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="mt-12 pt-8 border-t border-primary-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-accent-400 transition-colors duration-300"
                    aria-label={item.name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 Sindicato Industrial. Todos os direitos reservados.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2 text-xs text-gray-500">
                <Link href="/privacidade" className="hover:text-accent-400 transition-colors duration-300">
                  Política de Privacidade
                </Link>
                <Link href="/termos" className="hover:text-accent-400 transition-colors duration-300">
                  Termos de Uso
                </Link>
                <Link href="/cookies" className="hover:text-accent-400 transition-colors duration-300">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}