const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/productdb';

fs.mkdirSync(path.join(__dirname, 'public', 'uploads'), { recursive: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', productRoutes);

app.use((req, res) => {
  res.status(404).render('error', {
    status: 404,
    message: 'Không tìm thấy trang bạn yêu cầu.'
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);

  res.status(error.status || 500).render('error', {
    status: error.status || 500,
    message: error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.'
  });
});

async function start() {
  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    console.log('Server đang chạy tại http://localhost:' + PORT);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Không thể kết nối MongoDB:', error.message);
    process.exitCode = 1;
  });
}

module.exports = app;
