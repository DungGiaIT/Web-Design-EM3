const Product = require('../models/productModel');

exports.getHomePage = async (req, res) => {
  try {
    const [newProducts, topProducts] = await Promise.all([
      Product.getProductsBySection('new', 4),
      Product.getProductsBySection('top', 4)
    ]);

    res.render('layout', { newProducts, topProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Không thể tải danh sách sản phẩm');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getProducts({
      section: req.query.section,
      query: req.query.q && req.query.q.trim()
    });
    res.render('products', { products, query: req.query });
  } catch (err) {
    console.error(err);
    res.status(500).send('Không thể tải danh sách sản phẩm');
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(404).render('404', { message: 'Sản phẩm không tồn tại' });

    const product = await Product.getProductById(id);
    if (!product) return res.status(404).render('404', { message: 'Sản phẩm không tồn tại' });

    const relatedProducts = await Product.getRelatedProducts(product.category, product.id);
    res.render('product-detail', { product, relatedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Không thể tải sản phẩm');
  }
};

exports.getAboutPage = (req, res) => res.render('about');

exports.getContactPage = (req, res) => res.render('contact');

exports.submitContact = (req, res) => res.render('contact', { submitted: true });
