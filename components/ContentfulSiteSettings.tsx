'use client';

import { useSiteSettings } from '@/hooks/use-site-settings';
import { getImageUrl } from '@/lib/contentful';
import { getSocialIcon } from '@/lib/social-icons';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContentfulSiteSettings() {
  const { settings, loading, error } = useSiteSettings();

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Informações do Site</h2>
            <p className="section-subtitle">
              Carregando configurações...
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border/50 p-8 animate-pulse">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted-foreground/20 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !settings) {
    return (
      <section className="section-padding">
        <div className="container-section text-center">
          <h2 className="section-title">Informações do Site</h2>
          <p className="section-subtitle">
            Configurações não encontradas. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">Informações do Site</h2>
          <p className="section-subtitle">
            Configurações e informações importantes sobre nossa organização
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Informações principais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Informações da organização */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Informações da Organização
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-card-foreground mb-1">Nome do Site</h4>
                  <p className="text-muted-foreground">{settings.siteTitle}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-card-foreground mb-1">Descrição</h4>
                  <p className="text-muted-foreground">{settings.siteDescription}</p>
                </div>
              </div>
            </div>

            {/* Informações de contato */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                {settings.contactEmail && (
                  <div>
                    <h4 className="font-medium text-card-foreground mb-1">Email</h4>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${settings.contactEmail}`}
                        className="text-primary hover:text-primary/80 transition-colors duration-300"
                      >
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
                
                {settings.contactPhone && (
                  <div>
                    <h4 className="font-medium text-card-foreground mb-1">Telefone</h4>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={`tel:${settings.contactPhone}`}
                        className="text-primary hover:text-primary/80 transition-colors duration-300"
                      >
                        {settings.contactPhone}
                      </a>
                    </div>
                  </div>
                )}
                
                {settings.contactAddress && (
                  <div>
                    <h4 className="font-medium text-card-foreground mb-1">Endereço</h4>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <p className="text-muted-foreground">{settings.contactAddress}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Redes sociais */}
          {settings.socialLinks && (
            <div className="bg-card rounded-xl border border-border/50 p-6 mb-12">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Redes Sociais
              </h3>
              <p className="text-muted-foreground mb-6">
                Acesse nossas redes sociais
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(settings.socialLinks).map(([platform, url]) => (
                  url && typeof url === 'string' && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    >
                      {getSocialIcon(platform)}
                      <span className="font-medium text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </a>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          {(settings.newsletterTitle || settings.newsletterDescription) && (
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Newsletter
              </h3>
              {settings.newsletterTitle && (
                <h4 className="font-medium text-card-foreground mb-2">
                  {settings.newsletterTitle}
                </h4>
              )}
              {settings.newsletterDescription && (
                <p className="text-muted-foreground">
                  {settings.newsletterDescription}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
