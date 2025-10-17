import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/utils/constants';

export const WhatsAppButton = () => {
  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-12 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Não encontrou o que procurava?
        </h2>
        <p className="text-gray-600 mb-6">
          Nossa equipe está pronta para ajudar você!
        </p>

        <div className="flex items-center justify-center gap-6">
          <div className="hidden sm:block">
            <img
              src="/assets/atendente.jpg"
              alt="Atendente FACTOR"
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64';
              }}
            />
          </div>

          <button
            onClick={handleClick}
            className="flex items-center gap-3 bg-primary hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Atendimento via WhatsApp</span>
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Horário de atendimento: Segunda a Sexta, 8h às 18h
        </p>
      </div>
    </section>
  );
};
