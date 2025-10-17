import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { CategoryFilter } from '@/components/faq/CategoryFilter/CategoryFilter';
import { FAQList } from '@/components/faq/FAQList/FAQList';
import { WhatsAppButton } from '@/components/faq/WhatsAppButton/WhatsAppButton';
import { useFAQs, useCategoryCounts } from '@/hooks/useFAQs';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { faqs, isLoading, vote } = useFAQs({
    category: selectedCategory,
    search: searchTerm,
  });

  const { data: countsData } = useCategoryCounts();
  const counts = countsData?.data || {};

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Encontre respostas rápidas para suas dúvidas
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <CategoryFilter
                selected={selectedCategory}
                onSelect={handleCategorySelect}
                counts={counts}
              />
            </div>

            {/* FAQ List */}
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory
                    ? `FAQs - ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
                    : 'Todas as Perguntas Frequentes'}
                </h2>
                {searchTerm && (
                  <p className="text-gray-600 mt-2">
                    Resultados para: <span className="font-semibold">{searchTerm}</span>
                  </p>
                )}
              </div>

              <FAQList faqs={faqs} onVote={vote} isLoading={isLoading} />
            </div>
          </div>
        </section>

        {/* WhatsApp Contact */}
        <WhatsAppButton />
      </main>

      <Footer />
    </div>
  );
};
