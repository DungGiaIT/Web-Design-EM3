const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { buildProductQuery } = require('../utils/productQuery');
const { removeImageFile } = require('../config/upload');

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function requireObjectId(value, label = 'ID') {
  if (!mongoose.isValidObjectId(value)) throw httpError(400, `${label} không hợp lệ`);
}

async function resolveCategoryId(body) {
  if (body.categoryId) {
    requireObjectId(body.categoryId, 'Category ID');
    return body.categoryId;
  }

  if (!body.category) throw httpError(400, 'Cần categoryId hoặc category');

  if (mongoose.isValidObjectId(body.category)) return body.category;
  const category = await Category.findOne({ name: body.category }).lean();
  if (!category) throw httpError(404, 'Không tìm thấy category');
  return category._id;
}

exports.listProducts = async (req, res, next) => {
  try {
    const query = buildProductQuery(req.query);
    if (query.filter.categoryId) requireObjectId(query.filter.categoryId, 'Category ID');

    const [items, total] = await Promise.all([
      Product.find(query.filter)
        .populate('categoryId', 'name')
        .sort(query.sort)
        .skip(query.skip)
        .limit(query.limit)
        .lean(),
      Product.countDocuments(query.filter),
    ]);

    res.json({
      items,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / query.limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    requireObjectId(req.params.id, 'Product ID');
    const product = await Product.findById(req.params.id).populate('categoryId', 'name').lean();
    if (!product) throw httpError(404, 'Không tìm thấy sản phẩm');
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  let saved = false;
  try {
    requireObjectId(req.body.categoryId, 'Category ID');
    const categoryExists = await Category.exists({ _id: req.body.categoryId });
    if (!categoryExists) throw httpError(400, 'Category không tồn tại');

    const { name, price, stock, description, categoryId } = req.body;
    const product = await Product.create({
      name, price, stock, description, categoryId, image: req.file?.filename || null,
    });
    saved = true;
    await product.populate('categoryId', 'name');
    res.status(201).json(product);
  } catch (err) {
    if (req.file && !saved) await removeImageFile(req.file.filename).catch(console.error);
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    requireObjectId(req.params.id, 'Product ID');
    const existing = await Product.findById(req.params.id);
    if (!existing) throw httpError(404, 'Không tìm thấy sản phẩm');
    if (req.body.categoryId) {
      requireObjectId(req.body.categoryId, 'Category ID');
      const categoryExists = await Category.exists({ _id: req.body.categoryId });
      if (!categoryExists) throw httpError(400, 'Category không tồn tại');
    }

    const update = {};
    for (const field of ['name', 'price', 'stock', 'description', 'categoryId']) {
      if (Object.hasOwn(req.body, field)) update[field] = req.body[field];
    }
    if (req.file || req.body.removeImage === 'true' || req.body.removeImage === 'on') {
      update.image = req.file?.filename || null;
      update.imageCredit = null;
      update.imageSourceUrl = null;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    }).populate('categoryId', 'name');
    if (!product) throw httpError(404, 'Không tìm thấy sản phẩm');

    if (existing.image && Object.hasOwn(update, 'image')) {
      await removeImageFile(existing.image).catch(console.error);
    }
    res.json(product);
  } catch (err) {
    if (req.file) await removeImageFile(req.file.filename).catch(console.error);
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    requireObjectId(req.params.id, 'Product ID');
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw httpError(404, 'Không tìm thấy sản phẩm');
    await removeImageFile(product.image).catch(console.error);
    res.json({ message: 'Đã xóa sản phẩm' });
  } catch (err) {
    next(err);
  }
};

exports.avgPriceByCategory = async (_req, res, next) => {
  try {
    const result = await Product.aggregate([
      { $group: { _id: '$categoryId', avgPrice: { $avg: '$price' }, productCount: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { _id: 0, categoryId: '$_id', category: '$category.name', avgPrice: 1, productCount: 1 } },
      { $sort: { category: 1 } },
    ]);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.increasePrice = async (req, res, next) => {
  try {
    const categoryId = await resolveCategoryId(req.body);
    const result = await Product.updateMany({ categoryId }, { $mul: { price: 1.1 } });
    res.json({ message: 'Đã tăng giá 10%', matched: result.matchedCount, updated: result.modifiedCount });
  } catch (err) {
    next(err);
  }
};

exports.deleteByCategory = async (req, res, next) => {
  try {
    const categoryId = await resolveCategoryId(req.body);
    const result = await Product.deleteMany({ categoryId });
    res.json({ message: `Đã xóa ${result.deletedCount} sản phẩm`, deleted: result.deletedCount });
  } catch (err) {
    next(err);
  }
};
