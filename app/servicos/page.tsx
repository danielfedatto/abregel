import Header from '@/components/Header';
import ContentfulFooter from '@/components/ContentfulFooter';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';

export const metadata = {
  title: 'Serviços - Sindicato Industrial',
  description: 'Conheça todos os serviços especializados que oferecemos para o desenvolvimento do setor industrial.',
};

export default function ServicosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Nossos Serviços
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços especializados para 
              impulsionar o crescimento e competitividade das empresas do setor.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="text-center">
            <h2 className="section-title">
              Precisa de Mais Informações?
            </h2>
            <p className="section-subtitle mb-8">
              Nossa equipe está pronta para esclarecer dúvidas e 
              apresentar como nossos serviços podem beneficiar sua empresa.
            </p>
            <a href="/contato" className="btn-primary">
              Entre em Contato
            </a>
          </div>
        </div>
      </section>

      <ContentfulFooter />
    </div>
  );
}