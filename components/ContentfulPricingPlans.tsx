'use client';

import { useContentful } from '@/hooks/use-contentful';
import { PricingPlan } from '@/types/contentful';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function ContentfulPricingPlans() {
  const { data: plans, loading, error } = useContentful<PricingPlan>('pricingPlan', {
    limit: 6,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nossos Planos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando planos...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-8 animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 rounded mb-6"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !plans || plans.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nossos Planos
          </h2>
          <p className="text-lg text-gray-600">
            Nenhum plano encontrado. Verifique o Contentful.
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
            Nossos Planos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.sys.id}
              className={`relative bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-xl ${
                plan.fields.isPopular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {/* Badge de Plano Popular */}
              {plan.fields.isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white">
                  Mais Popular
                </Badge>
              )}

              {/* Cabeçalho do plano */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {plan.fields.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-800">
                    {plan.fields.currency === 'BRL' ? 'R$' : plan.fields.currency}
                    {plan.fields.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{plan.fields.period}
                  </span>
                </div>
                
                <p className="text-gray-600">
                  {plan.fields.description}
                </p>
              </div>

              {/* Lista de características */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.fields.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botão de ação */}
              <div className="text-center">
                {plan.fields.ctaLink ? (
                  <Button
                    asChild
                    className={`w-full ${
                      plan.fields.isPopular
                        ? 'bg-primary-600 hover:bg-primary-700'
                        : 'bg-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    <a href={plan.fields.ctaLink}>
                      {plan.fields.ctaText}
                    </a>
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${
                      plan.fields.isPopular
                        ? 'bg-primary-600 hover:bg-primary-700'
                        : 'bg-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    {plan.fields.ctaText}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

