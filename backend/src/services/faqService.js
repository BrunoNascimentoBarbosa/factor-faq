const { Op } = require('sequelize');
const { FAQ, User } = require('../models');

class FAQService {
  async getAll(filters) {
    const { category, search, page = 1, limit = 10, isPublished } = filters;

    const where = {};

    if (isPublished !== undefined) {
      where.isPublished = isPublished;
    }

    if (category) {
      where.categories = {
        [Op.contains]: [category]
      };
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { answer: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { rows: faqs, count: total } = await FAQ.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'name', 'email']
      }]
    });

    return {
      faqs,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    };
  }

  async getById(id) {
    return FAQ.findByPk(id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'name', 'email']
      }]
    });
  }

  async create(data) {
    return FAQ.create(data);
  }

  async update(id, data) {
    const faq = await FAQ.findByPk(id);
    if (!faq) return null;

    return faq.update(data);
  }

  async delete(id) {
    const faq = await FAQ.findByPk(id);
    if (!faq) return null;

    await faq.destroy();
    return faq;
  }

  async vote(id, isHelpful) {
    const faq = await FAQ.findByPk(id);
    if (!faq) return null;

    if (isHelpful) {
      faq.helpful += 1;
    } else {
      faq.notHelpful += 1;
    }

    return faq.save();
  }

  async incrementViews(id) {
    const faq = await FAQ.findByPk(id);
    if (!faq) return null;

    faq.views += 1;
    return faq.save();
  }

  async getCategoryCounts() {
    const { sequelize } = require('../config/database');

    const result = await sequelize.query(`
      SELECT category, COUNT(*) as count
      FROM (
        SELECT unnest(categories) as category
        FROM "FAQs"
        WHERE "isPublished" = true
      ) as cats
      GROUP BY category
    `, { type: sequelize.QueryTypes.SELECT });

    return result.reduce((acc, { category, count }) => {
      acc[category] = parseInt(count);
      return acc;
    }, {});
  }
}

module.exports = new FAQService();
