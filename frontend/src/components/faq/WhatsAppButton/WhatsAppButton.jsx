import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/utils/constants';

export const WhatsAppButton = () => {
  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 flex items-center gap-3 bg-primary hover:bg-orange-500 text-white font-semibold px-6 py-4 rounded-full shadow-2xl transition-all hover:shadow-xl hover:scale-105 z-50"
      title="Atendimento via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline">Atendimento via WhatsApp</span>
    </button>
  );
};
