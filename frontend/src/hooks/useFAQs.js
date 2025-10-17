import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { faqService } from '@/services/faqService';

export const useFAQs = (filters = {}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['faqs', filters],
    queryFn: () => faqService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const voteMutation = useMutation({
    mutationFn: ({ faqId, isHelpful }) => faqService.vote(faqId, isHelpful),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => faqService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => faqService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => faqService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });

  return {
    faqs: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    vote: voteMutation.mutate,
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isVoting: voteMutation.isPending,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export const useCategoryCounts = () => {
  return useQuery({
    queryKey: ['categoryCounts'],
    queryFn: () => faqService.getCategoryCounts(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};
