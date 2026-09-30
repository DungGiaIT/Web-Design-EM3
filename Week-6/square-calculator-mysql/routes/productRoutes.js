const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.get('/products/add', productController.showAddProductForm);
router.post('/products', productController.addProduct);
router.get('/products/edit/:id', productController.showEditProductForm);
router.post('/products/edit/:id', productController.updateProduct);
router.post('/products/delete/:id', productController.deleteProduct);

module.exports = router;
