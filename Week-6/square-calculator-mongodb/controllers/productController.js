const Product = require('../models/productModel');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.render('products/index', { products });
    } catch (error) {
      res.status(500).send('Error fetching products');
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).send('Product not found');
      res.render('products/edit', { product });
    } catch (error) {
      res.status(500).send('Error fetching product');
    }
  },
  createProduct: async (req, res) => {
    const { name, price, description } = req.body;
    try {
      await new Product({ name, price, description }).save();
      res.redirect('/products');
    } catch (error) {
      res.status(500).send('Error creating product');
    }
  },
  updateProduct: async (req, res) => {
    const { name, price, description } = req.body;
    try {
      await Product.findByIdAndUpdate(req.params.id, { name, price, description });
      res.redirect('/products');
    } catch (error) {
      res.status(500).send('Error updating product');
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect('/products');
    } catch (error) {
      res.status(500).send('Error deleting product');
    }
  }
};

module.exports = productController;
