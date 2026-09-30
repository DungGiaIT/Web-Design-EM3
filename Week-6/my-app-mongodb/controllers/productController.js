const Product = require('../models/productModel');

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({ _id: -1 });
      res.render('products/index', { products });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products');
    }
  },

  showAddProductForm: (req, res) => {
    res.render('products/new');
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).send('Product not found');
      res.render('products/edit', { product });
    } catch (error) {
      res.status(404).send('Product not found');
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, price, description } = req.body;
      await Product.create({ name, price, description });
      res.redirect('/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating product');
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, price, description } = req.body;
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, description },
        { new: true, runValidators: true }
      );
      if (!product) return res.status(404).send('Product not found');
      res.redirect('/products');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating product');
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).send('Product not found');
      res.redirect('/products');
    } catch (error) {
      res.status(404).send('Product not found');
    }
  }
};

module.exports = productController;
