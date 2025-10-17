import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFAQs } from '@/hooks/useFAQs';
import { Button } from '@/components/common/Button/Button';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

export const FAQManagement = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { faqs, isLoading, delete: deleteFAQ, isDeleting } = useFAQs({
    category: selectedCategory,
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Tem certeza que deseja deletar a FAQ:\n"${title}"?`)) {
      deleteFAQ(id, {
        onSuccess: () => {
          alert('FAQ deletado com sucesso!');
        },
        onError: () => {
          alert('Erro ao deletar FAQ');
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Carregando FAQs...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar FAQs</h1>
        <Button
          onClick={() => navigate('/admin/faqs/new')}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova FAQ
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categorias
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visualizações
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Votos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Nenhuma FAQ encontrada. Clique em "Nova FAQ" para criar.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {faq.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {faq.categories.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-1 text-xs bg-primary text-white rounded-full capitalize"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye className="w-4 h-4" />
                        {faq.views}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <span className="text-green-600">👍 {faq.helpful}</span>
                        {' / '}
                        <span className="text-red-600">👎 {faq.notHelpful}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          faq.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {faq.isPublished ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/faqs/edit/${faq._id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq._id, faq.title)}
                          disabled={isDeleting}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Deletar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
