import axios from '@/api/axios';

export const faqService = {
  async getAll(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await axios.get(`/faqs?${params.toString()}`);
    return response.data;
  },

  async getById(id) {
    const response = await axios.get(`/faqs/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await axios.post('/faqs', data);
    return response.data;
  },

  async update(id, data) {
    const response = await axios.put(`/faqs/${id}`, data);
    return response.data;
  },

  async delete(id) {
    const response = await axios.delete(`/faqs/${id}`);
    return response.data;
  },

  async vote(faqId, isHelpful) {
    const response = await axios.post(`/faqs/${faqId}/vote`, { isHelpful });
    return response.data;
  },

  async getCategoryCounts() {
    const response = await axios.get('/categories/counts');
    return response.data;
  },
};
