const Category = require('../models/Category');

exports.listCategories = async (_req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

