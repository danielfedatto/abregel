'use client';

import { useContentful } from '@/hooks/use-contentful';
import { Testimonial } from '@/types/contentful';
import { getImageUrl } from '@/lib/contentful';
import { Card, CardContent } from '@/components/ui/card';

export default function ContentfulTestimonials() {
  const { data: testimonials, loading, error } = useContentful<Testimonial>('testimonial', {
    limit: 6,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              O que dizem sobre nós
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando depoimentos...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            O que dizem sobre nós
          </h2>
          <p className="text-lg text-gray-600">
            Nenhum depoimento encontrado. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            O que dizem sobre nós
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Depoimentos de nossos associados e parceiros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.sys.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Avaliação */}
                {testimonial.fields.rating && (
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.fields.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}

                {/* Conteúdo do depoimento */}
                <blockquote className="text-gray-700 mb-6 italic">
                  "{testimonial.fields.content}"
                </blockquote>

                {/* Informações da pessoa */}
                <div className="flex items-center">
                  {testimonial.fields.avatar && (
                    <img
                      src={getImageUrl(testimonial.fields.avatar)}
                      alt={testimonial.fields.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  )}
                  {!testimonial.fields.avatar && (
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                      <span className="text-primary-600 font-semibold text-lg">
                        {testimonial.fields.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.fields.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.fields.role}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.fields.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

