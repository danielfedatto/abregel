'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Partner } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';

export default function ContentfulPartners() {
  const { data: partners, loading, error } = useContentful<Partner>('partner', {
    limit: 12,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nossos Parceiros
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando parceiros...
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-6 h-24 animate-pulse flex items-center justify-center">
                <div className="h-12 w-24 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !partners || partners.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nossos Parceiros
          </h2>
          <p className="text-lg text-gray-600">
            Nenhum parceiro encontrado. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nossos Parceiros
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empresas e organizações que confiam em nosso trabalho
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.sys.id}
              className="group bg-white rounded-lg p-6 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
            >
              {partner.fields.logo && (
                <div className="flex items-center justify-center h-20 mb-4">
                  <img
                    src={getImageUrl(partner.fields.logo)}
                    alt={partner.fields.name}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              )}
              
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {partner.fields.name}
                </h3>
                
                {partner.fields.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {partner.fields.description}
                  </p>
                )}
                
                {partner.fields.category && (
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                    {partner.fields.category}
                  </span>
                )}
                
                {partner.fields.website && (
                  <a
                    href={partner.fields.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-300"
                  >
                    Visitar site →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

