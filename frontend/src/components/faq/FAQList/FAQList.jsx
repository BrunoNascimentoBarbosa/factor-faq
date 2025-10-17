import { FAQItem } from '@/components/faq/FAQItem/FAQItem';

export const FAQList = ({ faqs, onVote, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!faqs || faqs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-500 text-lg">
          Nenhuma FAQ encontrada. Tente ajustar os filtros ou a pesquisa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FAQItem key={faq._id} faq={faq} onVote={onVote} />
      ))}
    </div>
  );
};
