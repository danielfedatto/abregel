import Link from 'next/link';
import { Target, Eye, Heart, Users, Award, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function QuemSomos() {
  const timeline = [
    { year: '1985', title: 'Fundação', desc: 'Criação do sindicato com 50 empresas fundadoras' },
    { year: '1995', title: 'Expansão', desc: 'Abertura de escritórios regionais em 5 estados' },
    { year: '2005', title: 'Modernização', desc: 'Implementação de sistemas digitais e novos serviços' },
    { year: '2015', title: 'Inovação', desc: 'Lançamento do programa de transformação digital' },
    { year: '2024', title: 'Sustentabilidade', desc: 'Foco em ESG e desenvolvimento sustentável' },
  ];

  const directors = [
    { name: 'Carlos Silva', position: 'Presidente', company: 'Metalúrgica Silva' },
    { name: 'Ana Santos', position: 'Vice-Presidente', company: 'Indústrias Santos' },
    { name: 'Roberto Lima', position: 'Diretor Financeiro', company: 'Lima & Associados' },
    { name: 'Maria Costa', position: 'Diretora de Relações', company: 'Costa Industrial' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Quem Somos</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Há mais de 35 anos construindo um futuro próspero para a indústria brasileira, 
              unidos pela excelência e comprometidos com o desenvolvimento sustentável do setor.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="section-padding">
        <div className="container-section">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossa Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Defender e representar os interesses do setor industrial, promovendo seu 
                desenvolvimento sustentável através de serviços especializados, capacitação 
                e representação institucional.
              </p>
            </div>

            <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossa Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser reconhecido como a principal referência em representação sindical 
                industrial, liderando a transformação e modernização do setor no Brasil 
                e internacionalmente.
              </p>
            </div>

            <div className="text-center bg-card p-8 rounded-2xl border border-border/50 card-hover">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Nossos Valores</h3>
              <p className="text-muted-foreground leading-relaxed">
                Transparência, ética, inovação, sustentabilidade, compromisso social 
                e excelência em tudo que fazemos para nossos associados e para a sociedade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Nossa História</h2>
            <p className="section-subtitle mx-auto">
              Uma trajetória de conquistas e crescimento ao lado da indústria brasileira.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-primary-500"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.year} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="bg-card p-6 rounded-xl border border-border/50 card-hover ml-12 md:ml-0">
                      <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diretoria */}
      <section id="diretoria" className="section-padding">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="section-title">Nossa Diretoria</h2>
            <p className="section-subtitle mx-auto">
              Líderes experientes e comprometidos com o desenvolvimento do setor industrial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {directors.map((director) => (
              <div key={director.name} className="text-center bg-card p-6 rounded-2xl border border-border/50 card-hover">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-1">{director.name}</h3>
                <p className="text-primary font-medium mb-2">{director.position}</p>
                <p className="text-sm text-muted-foreground">{director.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Números que Falam por Si
            </h2>
            <p className="text-xl text-white/90">
              Resultados concretos do nosso trabalho em prol do setor industrial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">+500</div>
              <p className="text-white/80">Empresas Associadas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">35+</div>
              <p className="text-white/80">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">50+</div>
              <p className="text-white/80">Eventos por Ano</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">1M+</div>
              <p className="text-white/80">Empregos Representados</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-section">
          <div className="text-center bg-card p-12 rounded-3xl border border-border/50">
            <Award className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-card-foreground mb-4">
              Faça Parte da Nossa História
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que confiam em nosso trabalho 
              para representar seus interesses e impulsionar o crescimento do setor.
            </p>
            <Link to="/contato" className="btn-primary">
              Associe-se Agora
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}