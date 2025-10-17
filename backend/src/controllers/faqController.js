const faqService = require('../services/faqService');

class FAQController {
  async getAll(req, res, next) {
    try {
      const { category, search, page = 1, limit = 10 } = req.query;

      const result = await faqService.getAll({
        category,
        search,
        page: parseInt(page),
        limit: parseInt(limit),
        isPublished: true
      });

      return res.status(200).json({
        success: true,
        data: result.faqs,
        pagination: {
          total: result.total,
          page: result.page,
          pages: result.pages
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const faq = await faqService.getById(req.params.id);

      if (!faq) {
        return res.status(404).json({
          success: false,
          message: 'FAQ não encontrado'
        });
      }

      // Incrementar visualizações
      await faqService.incrementViews(faq._id);

      return res.status(200).json({
        success: true,
        data: faq
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const faq = await faqService.create({
        ...req.body,
        createdBy: req.user._id
      });

      return res.status(201).json({
        success: true,
        data: faq,
        message: 'FAQ criado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const faq = await faqService.update(req.params.id, req.body);

      if (!faq) {
        return res.status(404).json({
          success: false,
          message: 'FAQ não encontrado'
        });
      }

      return res.status(200).json({
        success: true,
        data: faq,
        message: 'FAQ atualizado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const faq = await faqService.delete(req.params.id);

      if (!faq) {
        return res.status(404).json({
          success: false,
          message: 'FAQ não encontrado'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'FAQ deletado com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async vote(req, res, next) {
    try {
      const { isHelpful } = req.body;
      const faq = await faqService.vote(req.params.id, isHelpful);

      if (!faq) {
        return res.status(404).json({
          success: false,
          message: 'FAQ não encontrado'
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          helpful: faq.helpful,
          notHelpful: faq.notHelpful
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FAQController();
