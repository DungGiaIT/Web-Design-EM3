const path = require('path');
const fs = require('fs/promises');
const mongoose = require('mongoose');
const Product = require('../models/product');

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

function escapeRegex(value) {
  return value.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&');
}

function validateInput(body) {
  const name = String(body.name || '').trim();
  const price = Number(body.price);
  const quantity = Number(body.quantity);

  if (!name) return { error: 'Tên sản phẩm không được để trống.' };
  if (!Number.isFinite(price) || price < 0) return { error: 'Giá sản phẩm không hợp lệ.' };
  if (!Number.isInteger(quantity) || quantity < 0) {
    return { error: 'Số lượng phải là số nguyên không âm.' };
  }

  return { value: { name, price, quantity } };
}

async function removeFile(file) {
  if (file?.path) await fs.unlink(file.path).catch(() => {});
}

async function removeStoredImage(image) {
  if (!image?.startsWith('/uploads/')) return;
  await fs.unlink(path.join(uploadsDir, path.basename(image))).catch(() => {});
}

function invalidId(id) {
  return !mongoose.isValidObjectId(id);
}

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.render('index', { products, query: '' });
};

exports.showAddProductForm = (req, res) => {
  res.render('add');
};

exports.addProduct = async (req, res) => {
  const input = validateInput(req.body);
  if (input.error || !req.file) {
    await removeFile(req.file);
    return res.status(400).render('error', {
      status: 400,
      message: input.error || 'Bạn cần chọn hình ảnh sản phẩm.'
    });
  }

  try {
    await Product.create({ ...input.value, image: '/uploads/' + req.file.filename });
    res.redirect('/');
  } catch (error) {
    await removeFile(req.file);
    throw error;
  }
};

exports.showEditProductForm = async (req, res) => {
  if (invalidId(req.params.id)) return res.status(404).render('error', { status: 404, message: 'Sản phẩm không tồn tại.' });

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).render('error', { status: 404, message: 'Sản phẩm không tồn tại.' });
  res.render('edit', { product });
};

exports.updateProduct = async (req, res) => {
  if (invalidId(req.params.id)) {
    await removeFile(req.file);
    return res.status(404).render('error', { status: 404, message: 'Sản phẩm không tồn tại.' });
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    await removeFile(req.file);
    return res.status(404).render('error', { status: 404, message: 'Sản phẩm không tồn tại.' });
  }

  const input = validateInput(req.body);
  if (input.error) {
    await removeFile(req.file);
    return res.status(400).render('error', { status: 400, message: input.error });
  }

  const oldImage = product.image;
  Object.assign(product, input.value);
  if (req.file) product.image = '/uploads/' + req.file.filename;

  try {
    await product.save();
    if (req.file) await removeStoredImage(oldImage);
    res.redirect('/');
  } catch (error) {
    await removeFile(req.file);
    throw error;
  }
};

exports.deleteProduct = async (req, res) => {
  if (invalidId(req.params.id)) return res.status(404).render('error', { status: 404, message: 'Sản phẩm không tồn tại.' });

  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).render('error', { status: 404, message: 'Sản phẩm không tồn tại.' });
  await removeStoredImage(product.image);
  res.redirect('/');
};

exports.showProductDetail = async (req, res) => {
  if (invalidId(req.params.id)) return res.status(404).render('error', { status: 404, message: 'Sản phẩm không tồn tại.' });

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).render('error', { status: 404, message: 'Sản phẩm không tồn tại.' });
  res.render('show', { product });
};

exports.searchProduct = async (req, res) => {
  const query = String(req.query.q || '').trim();
  const products = query
    ? await Product.find({ name: { $regex: escapeRegex(query), $options: 'i' } }).sort({ createdAt: -1 })
    : await Product.find().sort({ createdAt: -1 });

  res.render('index', { products, query });
};
