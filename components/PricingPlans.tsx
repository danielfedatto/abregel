import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { plans } from '@/data/plans';

export default function PricingPlans() {
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
              key={plan.id}
              className={`relative bg-card border border-border/50 rounded-2xl p-8 card-hover ${
                plan.popular
                  ? 'ring-2 ring-primary-500 shadow-lg scale-105'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-card-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? 'text-card-foreground'
                          : 'text-muted-foreground line-through'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.cta.href}
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-outline hover:bg-primary-500 hover:text-white'
                }`}
              >
                {plan.cta.text}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Precisa de um plano personalizado?
          </p>
          <Link href="/contato" className="btn-outline">
            Fale com Nossa Equipe
          </Link>
        </div>
      </div>
    </section>
  );
}
