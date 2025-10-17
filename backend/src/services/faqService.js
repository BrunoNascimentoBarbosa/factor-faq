const FAQ = require('../models/FAQ');

class FAQService {
  async getAll(filters) {
    const { category, search, page = 1, limit = 10, isPublished } = filters;

    const query = {};

    if (isPublished !== undefined) {
      query.isPublished = isPublished;
    }

    if (category) {
      query.categories = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [faqs, total] = await Promise.all([
      FAQ.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('createdBy', 'name email'),
      FAQ.countDocuments(query)
    ]);

    return {
      faqs,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    };
  }

  async getById(id) {
    return FAQ.findById(id).populate('createdBy', 'name email');
  }

  async create(data) {
    const faq = new FAQ(data);
    return faq.save();
  }

  async update(id, data) {
    return FAQ.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  async delete(id) {
    return FAQ.findByIdAndDelete(id);
  }

  async vote(id, isHelpful) {
    const field = isHelpful ? 'helpful' : 'notHelpful';
    return FAQ.findByIdAndUpdate(
      id,
      { $inc: { [field]: 1 } },
      { new: true }
    );
  }

  async incrementViews(id) {
    return FAQ.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
  }

  async getCategoryCounts() {
    const counts = await FAQ.aggregate([
      { $match: { isPublished: true } },
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } }
    ]);

    return counts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});
  }
}

module.exports = new FAQService();
