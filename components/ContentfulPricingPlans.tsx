'use client';

import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { useContentful } from '@/hooks/use-contentful';
import { PricingPlan } from '@/types/contentful';

export default function ContentfulPricingPlans() {
  const { data: plans, loading, error } = useContentful<PricingPlan>('pricingPlan', {
    limit: 6,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Planos de Associação</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Escolha o plano ideal para o crescimento da sua empresa no setor industrial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative bg-card border border-border/50 rounded-2xl p-8 card-hover animate-pulse">
                <div className="text-center mb-8">
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-6"></div>
                  <div className="h-8 bg-muted rounded mb-6"></div>
                </div>
                <div className="space-y-4 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="h-5 w-5 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !plans || plans.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">Planos de Associação</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            Escolha o plano ideal para o crescimento da sua empresa no setor industrial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.sys.id}
              className={`relative bg-card border border-border/50 rounded-2xl p-8 card-hover flex flex-col justify-between ${
                plan.fields.isPopular
                  ? 'ring-2 ring-primary-500 shadow-lg scale-105'
                  : ''
              }`}
            >
              {plan.fields.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {plan.fields.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan.fields.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.fields.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-card-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.fields.ctaLink || '/contato'}
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.fields.isPopular
                    ? 'btn-primary'
                    : 'btn-outline hover:bg-primary-500 hover:text-white'
                }`}
              >
                {plan.fields.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

