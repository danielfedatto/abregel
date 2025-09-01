'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// Using public assets in Next.js

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
          ? 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 border-b border-gray-200 shadow-lg' 
          : 'bg-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/10 border-b border-white/20'
      }`}
    >
      <nav className="container-section">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={isScrolled ? "/assets/logo.svg" : "/assets/white_logo.svg"}
              alt="Sindicato Industrial"
              className="h-8 w-auto lg:h-12 object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
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
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-primary-900 hover:text-primary-700 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}