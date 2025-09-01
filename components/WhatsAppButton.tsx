'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5511945183030';
    const message = 'Olá! Gostaria de saber mais sobre os planos de associação.';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      // Posicionado ao lado direito, ao lado esquerdo do botão "back to top"
      // right-20 (80px) em mobile, right-24 (96px) em desktop
      className="fixed bottom-8 right-20 md:right-24 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
