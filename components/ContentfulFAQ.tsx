'use client';

import { useContentful } from '@/hooks/use-contentful';
import { FAQItem } from '@/types/contentful';
import { extractRichText } from '@/lib/contentful';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ContentfulFAQ() {
  const { data: faqItems, loading, error } = useContentful<FAQItem>('faqItem', {
    limit: 20,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Perguntas Frequentes</h2>
            <p className="section-subtitle mx-auto">
              Carregando perguntas frequentes...
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl border border-border/50 px-6 py-4 animate-pulse">
                  <div className="h-6 bg-muted-foreground/20 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !faqItems || faqItems.length === 0) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-section text-center">
          <h2 className="section-title">Perguntas Frequentes</h2>
          <p className="section-subtitle">
            Nenhuma pergunta frequente encontrada. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="text-center mb-12">
          <h2 className="section-title">Perguntas Frequentes</h2>
          <p className="section-subtitle mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços e associação.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem 
                key={item.sys.id} 
                value={item.sys.id}
                className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary data-[state=open]:text-primary transition-colors duration-300">
                  {item.fields.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: extractRichText(item.fields.answer) 
                    }} 
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}