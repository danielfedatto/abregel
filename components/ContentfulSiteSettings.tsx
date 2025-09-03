'use client';

import { useContentful } from '@/hooks/use-contentful';
import { SiteSettings } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Mail, Phone, MapPin, Clock, ExternalLink, Download } from 'lucide-react';

export default function ContentfulSiteSettings() {
  const { data: siteSettings, loading, error } = useContentful<SiteSettings>('siteSettings', {
    limit: 1,
  });

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Informações do Site
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando configurações...
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (error || !siteSettings || siteSettings.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Informações do Site
          </h2>
          <p className="text-lg text-gray-600">
            Configurações não encontradas. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  const settings = siteSettings[0];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Informações do Site
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Configurações e informações importantes sobre nossa organização
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Informações principais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Informações da organização */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-600" />
                  Informações da Organização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Nome do Site</h4>
                  <p className="text-gray-600">{settings.fields.siteTitle}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Descrição</h4>
                  <p className="text-gray-600">{settings.fields.siteDescription}</p>
                </div>
              </CardContent>
            </Card>

            {/* Informações de contato */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary-600" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings.fields.contactEmail && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email Principal</h4>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a 
                        href={`mailto:${settings.fields.contactEmail}`}
                        className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
                      >
                        {settings.fields.contactEmail}
                      </a>
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a 
                      href={`mailto:${settings.fields.contactEmail}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
                    >
                      {settings.fields.contactEmail}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Redes sociais */}
          {settings.fields.socialLinks && (
            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
                <CardDescription>
                  Acesse nossas redes sociais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(settings.fields.socialLinks).map(([platform, url]) => (
                    url && (
                      <div key={platform} className="flex items-center gap-3">
                        <Badge variant="outline" className="w-20 text-center">
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Acessar ${platform}`}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Acessar
                          </a>
                        </Button>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Configurações técnicas */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Técnicas</CardTitle>
              <CardDescription>
                Informações sobre a versão e configurações do site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Status</h4>
                  <Badge variant="default" className="text-lg">
                    Ativo
                  </Badge>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Tipo</h4>
                  <Badge variant="outline" className="text-lg">
                    Site Corporativo
                  </Badge>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Plataforma</h4>
                  <Badge variant="secondary" className="text-lg">
                    Next.js + Contentful
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
