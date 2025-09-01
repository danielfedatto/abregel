'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    
    try {
      // TODO: integrate with backend or newsletter provider
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setName('');
      setEmail('');
      
      // Reset após 3 segundos
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Erro ao inscrever na newsletter:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center space-x-2 text-green-400">
        <CheckCircle className="h-6 w-6" />
        <span className="text-lg">Inscrição realizada com sucesso!</span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Mail className="h-10 w-10 text-white/90" />
          <h2 className="text-3xl font-bold">Newsletter</h2>
        </div>
        
        <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto">
          Receba novidades, eventos e oportunidades diretamente no seu e-mail.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor='newsletter-footer-name' className="block text-sm font-medium text-white/90 mb-2">Nome</label>
            <Input
              id='newsletter-footer-name'
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="bg-primary-700 border-primary-600 text-white placeholder:text-white/90 focus:border-accent-400 focus:ring-accent-400 h-12 text-base"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="md:col-span-1">
            <label htmlFor='newsletter-footer-email' className="block text-sm font-medium text-white/90 mb-2">E-mail</label>
            <Input
              id='newsletter-footer-email'
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="bg-primary-700 border-primary-600 text-white placeholder:text-white/90 focus:border-accent-400 focus:ring-accent-400 h-12 text-base"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="md:col-span-1">
            <Button 
              type="submit" 
              disabled={isSubmitting || !name || !email}
              className="btn-secondary w-full hover:bg-accent-600 text-white px-6 py-3 h-12 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Inscrever na Newsletter'}
            </Button>
          </div>
        </div>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Não compartilhamos seus dados. Você pode cancelar a qualquer momento.
        </p>
      </div>
    </div>
  );
}
