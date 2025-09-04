'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useContentful } from '@/hooks/use-contentful';
import { Footer, NavigationLink, SocialLink } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { getSocialIcon } from '@/lib/social-icons';
import NewsletterForm from './NewsletterForm';

export default function ContentfulFooter() {
  const { data: footerData, loading, error } = useContentful<Footer>('wE5zHIytxoWUX6CP82jF8', {
    limit: 1,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <footer className="bg-primary-900 text-white">
        {/* Newsletter Section - Full Width */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-700 py-16">
          <div className="container-section">
            <div className="w-full">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container-section py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo e Descrição */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-32 lg:h-40 w-48 bg-muted-foreground/20 rounded animate-pulse"></div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-muted-foreground/20 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted-foreground/20 rounded w-1/2 animate-pulse"></div>
              </div>

              {/* Contato */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-accent-400 flex-shrink-0" />
                  <div className="h-4 bg-muted-foreground/20 rounded w-48 animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent-400 flex-shrink-0" />
                  <div className="h-4 bg-muted-foreground/20 rounded w-32 animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent-400 flex-shrink-0" />
                  <div className="h-4 bg-muted-foreground/20 rounded w-48 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Links Institucional */}
            <div>
              <div className="h-6 bg-muted-foreground/20 rounded w-24 mb-6 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted-foreground/20 rounded w-20 animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Links Serviços */}
            <div>
              <div className="h-6 bg-muted-foreground/20 rounded w-16 mb-6 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted-foreground/20 rounded w-24 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="mt-12 pt-8 border-t border-primary-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 w-6 bg-muted-foreground/20 rounded animate-pulse"></div>
                ))}
              </div>
              
              <div className="text-center md:text-right">
                <div className="h-4 bg-muted-foreground/20 rounded w-64 mb-2 animate-pulse"></div>
                <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-3 bg-muted-foreground/20 rounded w-16 animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (error || !footerData || footerData.length === 0) {
    return (
      <footer className="bg-primary-900 text-white">
        <div className="container-section py-16 text-center">
          <h2 className="text-xl font-semibold mb-4">Footer</h2>
          <p className="text-gray-300">
            Configurações do rodapé não encontradas. Verifique o Contentful.
          </p>
        </div>
      </footer>
    );
  }

  const footer = footerData[0];

  return (
    <footer className="bg-primary-900 text-white">
      {/* Newsletter Section - Full Width */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 py-16">
        <div className="container-section">
          <div className="w-full">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-section py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              {footer.fields.logo ? (
                <img
                  src={getImageUrl(footer.fields.logo)}
                  alt={footer.fields.title}
                  className="h-32 lg:h-40 w-auto object-contain"
                />
              ) : (
                <img
                  src="/assets/logo_footer.svg"
                  alt={footer.fields.title}
                  className="h-32 lg:h-40 w-auto object-contain"
                />
              )}
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {footer.fields.description}
            </p>

            {/* Contato */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent-400 flex-shrink-0" />
                <span className="text-gray-300" dangerouslySetInnerHTML={{ __html: footer.fields.address.replace(/\n/g, '<br />') }} />
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent-400 flex-shrink-0" />
                <span className="text-gray-300">{footer.fields.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent-400 flex-shrink-0" />
                <span className="text-gray-300">{footer.fields.email}</span>
              </div>
            </div>
          </div>

          {/* Links Institucional */}
          {footer.fields.institutionalLinks && footer.fields.institutionalLinks.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-6 text-accent-400">Institucional</h4>
              <ul className="space-y-3">
                {footer.fields.institutionalLinks
                  .sort((a, b) => a.fields.order - b.fields.order)
                  .map((link) => (
                    <li key={link.sys.id}>
                      <Link 
                        href={link.fields.href}
                        className="text-gray-300 hover:text-accent-400 transition-colors duration-300 link-hover"
                      >
                        {link.fields.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Links Serviços */}
          {footer.fields.serviceLinks && footer.fields.serviceLinks.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-6 text-accent-400">Serviços</h4>
              <ul className="space-y-3">
                {footer.fields.serviceLinks
                  .sort((a, b) => a.fields.order - b.fields.order)
                  .map((link) => (
                    <li key={link.sys.id}>
                      <Link 
                        href={link.fields.href}
                        className="text-gray-300 hover:text-accent-400 transition-colors duration-300 link-hover"
                      >
                        {link.fields.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Redes Sociais */}
        <div className="mt-12 pt-8 border-t border-primary-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {footer.fields.socialLinks && footer.fields.socialLinks.length > 0 && (
              <div className="flex space-x-6">
                {footer.fields.socialLinks
                  .sort((a, b) => a.fields.order - b.fields.order)
                  .map((socialLink) => {
                    return (
                      <a
                        key={socialLink.sys.id}
                        href={socialLink.fields.href}
                        className="text-gray-300 hover:text-accent-400 transition-colors duration-300"
                        aria-label={socialLink.fields.name}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(socialLink.fields.platform)}
                      </a>
                    );
                  })}
              </div>
            )}
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                {footer.fields.copyright}
              </p>
              {footer.fields.legalLinks && footer.fields.legalLinks.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2 text-xs text-gray-500">
                  {footer.fields.legalLinks
                    .sort((a, b) => a.fields.order - b.fields.order)
                    .map((link) => (
                      <Link 
                        key={link.sys.id}
                        href={link.fields.href} 
                        className="hover:text-accent-400 transition-colors duration-300"
                      >
                        {link.fields.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
