const Product = require('../models/productModel');

const productController = {
  getProducts: (req, res) => {
    Product.getAllProducts((err, products) => {
      if (err) return res.status(500).json({ error: 'Database query error' });
      return res.render('products', { products });
    });
  },
  showAddProductForm: (req, res) => {
    return res.render('formProduct', { product: {} });
  },
  addProduct: (req, res) => {
    Product.createProduct(req.body, (err) => {
      if (err) return res.status(500).json({ error: 'Failed to add product' });
      return res.redirect('/api/products');
    });
  },
  showEditProductForm: (req, res) => {
    Product.getProductById(req.params.id, (err, product) => {
      if (err || !product) return res.status(404).json({ error: 'Product not found' });
      return res.render('formProduct', { product });
    });
  },
  updateProduct: (req, res) => {
    Product.updateProduct(req.params.id, req.body, (err) => {
      if (err) return res.status(500).json({ error: 'Failed to update product' });
      return res.redirect('/api/products');
    });
  },
  deleteProduct: (req, res) => {
    Product.deleteProduct(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: 'Failed to delete product' });
      return res.redirect('/api/products');
    });
  }
};

module.exports = productController;
