import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faq } from '@/data/faq';

export default function FAQ() {
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
            {faq.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary data-[state=open]:text-primary transition-colors duration-300">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}