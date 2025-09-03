'use client';

import { useContentful } from '@/hooks/use-contentful';
import { FAQItem } from '@/types/contentful';
import { extractRichText } from '@/lib/contentful';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ContentfulFAQ() {
  const { data: faqItems, loading, error } = useContentful<FAQItem>('faqItem', {
    limit: 10,
    order: ['fields.order'],
  });

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Carregando FAQ...
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !faqItems || faqItems.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Nenhuma pergunta encontrada. Verifique o Contentful.
          </p>
        </div>
      </section>
    );
  }

  // Agrupar por categoria se existir
  const groupedFAQ = faqItems.reduce((acc, item) => {
    const category = item.fields.category || 'Geral';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos serviços e processos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {Object.entries(groupedFAQ).map(([category, items]) => (
            <div key={category} className="mb-8">
              {Object.keys(groupedFAQ).length > 1 && (
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                  {category}
                </h3>
              )}
              
              <Accordion type="single" collapsible className="space-y-4">
                {items.map((item) => (
                  <AccordionItem
                    key={item.sys.id}
                    value={item.sys.id}
                    className="border border-gray-200 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium text-gray-800">
                        {item.fields.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div 
                        className="text-gray-600 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: extractRichText(item.fields.answer)
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

