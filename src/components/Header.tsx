'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logoImage from '@/assets/logo.jpg';

const navigation = [
  { name: 'Quem Somos', href: '/quem-somos' },
  { name: 'Serviços', href: '/servicos' },
  { name: 'Parcerias', href: '/parcerias' },
  { name: 'Notícias', href: '/noticias' },
  { name: 'Contato', href: '/contato' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-section">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logoImage}
              alt="Sindicato Logo"
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover"
            />
            <span
              className={`hidden sm:block font-bold text-lg lg:text-xl transition-colors duration-300 ${
                isScrolled ? 'text-primary-900' : 'text-white'
              }`}
            >
              Sindicato Industrial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-all duration-300 link-hover ${
                  isScrolled
                    ? 'text-primary-900 hover:text-primary-700'
                    : 'text-white hover:text-accent-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/contato"
              className={`font-semibold px-6 py-2 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              Associe-se
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className={`p-2 transition-colors duration-300 ${
                    isScrolled ? 'text-primary-900' : 'text-white'
                  }`}
                  aria-label="Menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-primary-900 hover:text-primary-700 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <Link
                      to="/contato"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary block text-center"
                    >
                      Associe-se
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}