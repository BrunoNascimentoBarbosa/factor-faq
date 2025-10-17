import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { useFAQs } from '@/hooks/useFAQs';
import { faqService } from '@/services/faqService';
import { ArrowLeft } from 'lucide-react';

const CATEGORIES = [
  { id: 'cadastro', name: 'Cadastro' },
  { id: 'monitoramento', name: 'Monitoramento' },
  { id: 'medicao', name: 'Medição' },
  { id: 'financeiro', name: 'Financeiro' },
];

export const FAQForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const { create, update, isCreating, isUpdating } = useFAQs();

  const [formData, setFormData] = useState({
    title: '',
    answer: '',
    categories: [],
    youtubeUrl: '',
    tags: '',
    isPublished: true,
  });

  const [errors, setErrors] = useState({});

  // Buscar FAQ existente se estiver em modo de edição
  const { data: faqData, isLoading: isLoadingFAQ } = useQuery({
    queryKey: ['faq', id],
    queryFn: () => faqService.getById(id),
    enabled: isEditMode,
  });

  // Preencher formulário com dados da FAQ ao carregar
  useEffect(() => {
    if (isEditMode && faqData?.data) {
      const faq = faqData.data;
      setFormData({
        title: faq.title || '',
        answer: faq.answer?.replace(/<\/?p>/g, '') || '',
        categories: faq.categories || [],
        youtubeUrl: faq.youtubeUrl || '',
        tags: Array.isArray(faq.tags) ? faq.tags.join(', ') : '',
        isPublished: faq.isPublished ?? true,
      });
    }
  }, [isEditMode, faqData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prev) => {
      const categories = prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.answer.trim()) {
      newErrors.answer = 'Resposta é obrigatória';
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'Selecione pelo menos uma categoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSend = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      answer: formData.answer.startsWith('<p>')
        ? formData.answer
        : `<p>${formData.answer}</p>`,
    };

    if (isEditMode) {
      // Atualizar FAQ existente
      update(
        { id, data: dataToSend },
        {
          onSuccess: () => {
            alert('FAQ atualizado com sucesso!');
            navigate('/admin/faqs');
          },
          onError: (error) => {
            alert('Erro ao atualizar FAQ: ' + (error.message || 'Erro desconhecido'));
          },
        }
      );
    } else {
      // Criar nova FAQ
      create(dataToSend, {
        onSuccess: () => {
          alert('FAQ criado com sucesso!');
          navigate('/admin/faqs');
        },
        onError: (error) => {
          alert('Erro ao criar FAQ: ' + (error.message || 'Erro desconhecido'));
        },
      });
    }
  };

  if (isEditMode && isLoadingFAQ) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Carregando FAQ...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/faqs')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para lista
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? 'Editar FAQ' : 'Criar Nova FAQ'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <Input
          label="Título *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Ex: Como cadastrar uma transportadora?"
          maxLength={200}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resposta *
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            rows={6}
            className={`input-field ${errors.answer ? 'border-red-500' : ''}`}
            placeholder="Digite a resposta completa..."
          />
          {errors.answer && (
            <p className="mt-1 text-sm text-red-600">{errors.answer}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categorias * (selecione pelo menos uma)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="w-4 h-4 text-primary"
                />
                <span className="font-medium">{category.name}</span>
              </label>
            ))}
          </div>
          {errors.categories && (
            <p className="mt-1 text-sm text-red-600">{errors.categories}</p>
          )}
        </div>

        <Input
          label="URL do Vídeo YouTube (opcional)"
          name="youtubeUrl"
          value={formData.youtubeUrl}
          onChange={handleChange}
          placeholder="https://www.youtube.com/watch?v=..."
        />

        <Input
          label="Tags (separadas por vírgula)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="cadastro, transportadora, empresa"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-4 h-4 text-primary"
          />
          <label className="text-sm font-medium text-gray-700">
            Publicar imediatamente
          </label>
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <Button
            type="submit"
            variant="primary"
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating
              ? 'Salvando...'
              : isEditMode
                ? 'Atualizar FAQ'
                : 'Salvar FAQ'
            }
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/faqs')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};
