const faqService = require('../services/faqService');
const Category = require('../models/Category');

class CategoryController {
  async getAll(req, res, next) {
    try {
      const categories = await Category.find({ isActive: true }).sort({ order: 1 });

      return res.status(200).json({
        success: true,
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }

  async getCounts(req, res, next) {
    try {
      const counts = await faqService.getCategoryCounts();

      return res.status(200).json({
        success: true,
        data: counts
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const category = new Category(req.body);
      await category.save();

      return res.status(201).json({
        success: true,
        data: category,
        message: 'Categoria criada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Categoria não encontrada'
        });
      }

      return res.status(200).json({
        success: true,
        data: category,
        message: 'Categoria atualizada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Categoria não encontrada'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Categoria deletada com sucesso'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
