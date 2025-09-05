'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ContactPage, ContactInfo } from '@/types/contentful';

// Ícones disponíveis
const iconMap = {
  MapPin,
  Phone,
  Mail,
  Clock,
};

interface ContentfulContactPageProps {
  className?: string;
}

export default function ContentfulContactPage({ className = '' }: ContentfulContactPageProps) {
  const [contactData, setContactData] = useState<ContactPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contentful/contact-page');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar dados de contato');
      }
      
      const data = await response.json();
      setContactData(data);
    } catch (err) {
      console.error('Erro ao buscar dados de contato:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Mensagem enviada com sucesso!',
          description: 'Entraremos em contato em breve. Obrigado!',
        });

        // Limpar o formulário
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        // Tratar erros de validação
        if (result.details && Array.isArray(result.details)) {
          const errorMessages = result.details.map((error: any) => error.message).join(', ');
          toast({
            title: 'Erro de validação',
            description: errorMessages,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erro ao enviar mensagem',
            description: result.error || 'Tente novamente mais tarde.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: 'Erro de conexão',
        description: 'Verifique sua conexão e tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContactInfo = (info: ContactInfo) => {
    const contactItems = [
      { key: 'address', icon: 'MapPin' },
      { key: 'phone', icon: 'Phone' },
      { key: 'email', icon: 'Mail' },
      { key: 'hours', icon: 'Clock' },
    ];

    return contactItems.map(({ key, icon }) => {
      const IconComponent = iconMap[icon as keyof typeof iconMap];
      const item = info[key as keyof ContactInfo];
      
      if (!item) return null;

      return (
        <div key={key} className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl flex-shrink-0">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-1">
              {item.title}
            </h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {item.value}
            </p>
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${className}`}>
        {/* Hero Section Skeleton */}
        <section className="pt-20 pb-16 bg-gradient-primary text-white">
          <div className="container-section">
            <div className="text-center">
              <div className="h-12 bg-white/20 rounded mb-6 mx-auto w-96 animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded mx-auto w-3/4 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Content Skeleton */}
        <section className="section-padding">
          <div className="container-section">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded mb-4 animate-pulse"></div>
                <div className="h-6 bg-muted rounded mb-8 animate-pulse"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-xl animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-muted rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border/50">
                <div className="h-8 bg-muted rounded mb-6 animate-pulse"></div>
                <div className="space-y-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !contactData) {
    return (
      <div className={`min-h-screen ${className}`}>
        <section className="pt-20 pb-16 bg-gradient-primary text-white">
          <div className="container-section">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">Entre em Contato</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Estamos aqui para ajudar. Entre em contato conosco para tirar dúvidas, 
                solicitar informações ou iniciar o processo de associação.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-section">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Erro ao carregar dados
              </h2>
              <p className="text-muted-foreground mb-8">
                {error || 'Não foi possível carregar as informações de contato.'}
              </p>
              <Button onClick={fetchContactData} variant="outline">
                Tentar Novamente
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${className}`}>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary text-white">
        <div className="container-section">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {contactData.fields.heroTitle}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {contactData.fields.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contato Principal */}
      <section className="section-padding">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div>
              <h2 className="section-title">{contactData.fields.title}</h2>
              <p className="section-subtitle mb-8">
                {contactData.fields.subtitle}
              </p>

              <div className="space-y-6">
                {renderContactInfo(contactData.fields.contactInfo)}
              </div>

              {/* Mapa */}
              <div className="mt-8 aspect-video bg-muted rounded-2xl border border-border/50 flex items-center justify-center">
                <div className="text-center">
                  <iframe className='rounded-2xl border border-border/50 shadow-xl shadow-primary/10 grayscale' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1664.387793682233!2d-46.69232494861386!3d-23.57094676574052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce570f44dd4193%3A0xcc3f94c9a245af7a!2sABREGEL!5e0!3m2!1spt-BR!2sbr!4v1757114115778!5m2!1spt-BR!2sbr" width="600" height="450" loading="lazy"/>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div>
              <div className="bg-card p-8 rounded-2xl border border-border/50">
                <h3 className="text-2xl font-bold text-card-foreground mb-6">
                  {contactData.fields.formTitle}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nome da sua empresa"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Qual o motivo do contato?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Descreva sua solicitação, dúvida ou sugestão..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-primary"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Associação */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="text-center bg-gradient-primary text-white p-12 rounded-3xl">
            <h2 className="text-3xl font-bold mb-4">
              {contactData.fields.ctaTitle}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {contactData.fields.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-secondary">
                Baixar Material Informativo
              </Button>
              <Button className="btn-secondary">
                Agendar Reunião
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
