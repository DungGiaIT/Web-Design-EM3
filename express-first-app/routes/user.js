const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Danh sach nguoi dung');
});

router.get('/:id', (req, res) => {
  res.send(`Danh sach nguoi dung voi id ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('Tao moi nguoi dung');
});

module.exports = router;