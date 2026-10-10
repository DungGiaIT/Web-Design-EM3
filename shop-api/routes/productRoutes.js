const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

module.exports = (upload) => {
  router.post('/', upload.single('image'), productController.create);
  router.get('/', productController.list);
  router.get('/:id', productController.get);
  router.put('/:id', upload.single('image'), productController.update);
  router.delete('/:id', productController.remove);
  return router;
};
