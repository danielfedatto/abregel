import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { partners } from '@/data/partners';
import { Building, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Parcerias - Sindicato Industrial',
  description: 'Conheça nossos parceiros estratégicos e saiba como sua empresa pode se juntar a nossa rede.',
};

export default function ParceriasPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Nossas Parcerias
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Trabalhamos em conjunto com empresas e organizações de referência 
              para oferecer ainda mais valor aos nossos associados.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section-padding">
        <div className="container-section">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                className="flex items-center justify-center p-8 bg-card rounded-xl border border-border/50 opacity-70 hover:opacity-100 transition-opacity duration-300 card-hover"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-muted rounded-lg mb-4 mx-auto flex items-center justify-center">
                    <Building className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="text-center">
            <h2 className="section-title">
              Torne-se Nosso Parceiro
            </h2>
            <p className="section-subtitle mb-8">
              Junte-se à nossa rede de parceiros estratégicos e 
              contribua para o desenvolvimento do setor industrial.
            </p>
            <a href="/contato" className="btn-primary group">
              Quero Ser Parceiro
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}