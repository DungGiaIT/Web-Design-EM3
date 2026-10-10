const Product = require('../models/productModel');

exports.getHomePage = async (req, res) => {
  try {
    const [newProducts, topProducts] = await Promise.all([
      Product.find({ section: 'new' }).sort({ displayOrder: 1 }).limit(4),
      Product.find({ section: 'top' }).sort({ displayOrder: 1 }).limit(4)
    ]);

    res.render('layout', { newProducts, topProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Không thể tải danh sách sản phẩm');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const filter = {};
    if (['new', 'top', 'catalog'].includes(req.query.section)) filter.section = req.query.section;
    if (req.query.q) filter.name = new RegExp(req.query.q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    const products = await Product.find(filter).sort({ displayOrder: 1, legacyId: 1 });
    res.render('products', { products, query: req.query });
  } catch (err) {
    console.error(err);
    res.status(500).send('Không thể tải danh sách sản phẩm');
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const legacyId = Number(req.params.id);
    if (!Number.isInteger(legacyId)) return res.status(404).render('404', { message: 'Sản phẩm không tồn tại' });

    const product = await Product.findOne({ legacyId });
    if (!product) return res.status(404).render('404', { message: 'Sản phẩm không tồn tại' });

    const relatedProducts = await Product.find({
      category: product.category,
      legacyId: { $ne: product.legacyId }
    }).sort({ displayOrder: 1 }).limit(4);

    res.render('product-detail', { product, relatedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Không thể tải sản phẩm');
  }
};

exports.getAboutPage = (req, res) => res.render('about');

exports.getContactPage = (req, res) => res.render('contact');

exports.submitContact = (req, res) => res.render('contact', { submitted: true });
