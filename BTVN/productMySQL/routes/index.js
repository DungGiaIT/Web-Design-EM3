const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getHomePage);
router.get('/about', productController.getAboutPage);
router.get('/contact', productController.getContactPage);
router.post('/contact', productController.submitContact);
router.get('/product', productController.getProducts);
router.get('/product/:id', productController.getProductDetails);

module.exports = router;
