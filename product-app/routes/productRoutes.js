const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const router = express.Router();
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'uploads'),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + extension);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) return cb(null, true);
    cb(new Error('Chỉ chấp nhận ảnh JPG, PNG, GIF hoặc WEBP.'));
  }
});

router.get('/', productController.getAllProducts);
router.get('/add', productController.showAddProductForm);
router.post('/add', upload.single('image'), productController.addProduct);
router.get('/edit/:id', productController.showEditProductForm);
router.post('/edit/:id', upload.single('image'), productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);
router.get('/products/:id', productController.showProductDetail);
router.get('/search', productController.searchProduct);

module.exports = router;
