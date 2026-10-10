const express = require('express');
const productController = require('../controllers/productController');
const { upload } = require('../config/upload');

const router = express.Router();

router.get('/', productController.listProducts);
router.post('/', upload.single('image'), productController.createProduct);

router.get('/search', productController.listProducts);
router.get('/sort', productController.listProducts);
router.get('/page', productController.listProducts);
router.get('/avg', productController.avgPriceByCategory);
router.put('/increase', productController.increasePrice);
router.delete('/delete-category', productController.deleteByCategory);

router.get('/:id', productController.getProductById);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
