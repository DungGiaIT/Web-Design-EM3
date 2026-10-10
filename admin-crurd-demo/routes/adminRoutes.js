const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get('/', controller.getAll);
router.post('/add', upload.single('image'), controller.create);
router.get('/edit/:id', controller.editForm);
router.post('/edit/:id', upload.single('image'), controller.update);
router.get('/delete/:id', controller.delete);

module.exports = router;