const Product = require('../models/productModel');

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.getAllProducts();
      res.render('products/index', { products });
    } catch (error) {
      console.error(error);
      res.status(500).send('Database query error');
    }
  },

  showAddProductForm: (req, res) => {
    res.render('products/new');
  },

  showEditProductForm: async (req, res) => {
    try {
      const product = await Product.getProductById(req.params.id);
      if (!product) return res.status(404).send('Product not found');
      res.render('products/edit', { product });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching product');
    }
  },

  addProduct: async (req, res) => {
    try {
      await Product.createProduct(req.body);
      res.redirect('/api/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to add product');
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updated = await Product.updateProduct(req.params.id, req.body);
      if (!updated) return res.status(404).send('Product not found');
      res.redirect('/api/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to update product');
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deleted = await Product.deleteProduct(req.params.id);
      if (!deleted) return res.status(404).send('Product not found');
      res.redirect('/api/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to delete product');
    }
  }
};

module.exports = productController;
