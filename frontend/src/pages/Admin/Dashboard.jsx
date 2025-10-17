import { Link } from 'react-router-dom';
import { FileText, TrendingUp, ThumbsUp, Eye } from 'lucide-react';
import { useFAQs } from '@/hooks/useFAQs';

export const Dashboard = () => {
  const { faqs, isLoading } = useFAQs({});

  // Calcular estatísticas
  const totalFAQs = faqs?.length || 0;
  const totalViews = faqs?.reduce((sum, faq) => sum + (faq.views || 0), 0) || 0;
  const totalHelpful = faqs?.reduce((sum, faq) => sum + (faq.helpful || 0), 0) || 0;
  const totalNotHelpful = faqs?.reduce((sum, faq) => sum + (faq.notHelpful || 0), 0) || 0;
  const totalVotes = totalHelpful + totalNotHelpful;
  const satisfactionRate = totalVotes > 0
    ? Math.round((totalHelpful / totalVotes) * 100)
    : 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Carregando estatísticas...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{totalFAQs}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Total de FAQs</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{totalViews}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Visualizações</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <ThumbsUp className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{totalHelpful}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Votos Positivos</h3>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">{satisfactionRate}%</span>
              </div>
              <h3 className="text-gray-600 font-medium">Taxa de Satisfação</h3>
            </div>
          </div>

          {/* FAQs Mais Visualizados */}
          {totalFAQs > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">FAQs Mais Visualizados</h2>
              <div className="space-y-3">
                {faqs
                  .sort((a, b) => (b.views || 0) - (a.views || 0))
                  .slice(0, 5)
                  .map((faq) => (
                    <div
                      key={faq._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{faq.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {faq.views || 0} visualizações
                          </span>
                          <span className="text-sm text-green-600">
                            👍 {faq.helpful || 0}
                          </span>
                          <span className="text-sm text-red-600">
                            👎 {faq.notHelpful || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Ações Rápidas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/admin/faqs/new"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all text-center"
              >
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <span className="font-medium text-gray-700">Criar Nova FAQ</span>
              </Link>

              <Link
                to="/admin/faqs"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all text-center"
              >
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <span className="font-medium text-gray-700">Gerenciar FAQs</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
