require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const { uploadDir } = require('./config/upload');

const app = express();
const port = Number(process.env.PORT) || 3001;

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use('/uploads', express.static(uploadDir));

app.get('/', (_req, res) => {
  res.json({ name: 'Shop Mongo API', products: '/api/products' });
});

app.get('/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? 'ok' : 'database unavailable' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use((_req, res) => res.status(404).json({ message: 'Không tìm thấy endpoint' }));

app.use((err, _req, res, _next) => {
  let status = err.status || 500;

  if (err.name === 'ValidationError' || err.name === 'CastError') status = 400;
  if (err.code === 11000) status = 409;
  if (err.code === 'LIMIT_FILE_SIZE') status = 413;
  if (err.name === 'MulterError' && status === 500) status = 400;

  if (status >= 500) console.error(err);
  res.status(status).json({ message: status >= 500 ? 'Lỗi máy chủ' : err.message });
});

async function start() {
  await connectDB();
  app.listen(port, '0.0.0.0', () => {
    console.log(`API đang chạy tại http://0.0.0.0:${port}`);
  });
}

start().catch((err) => {
  console.error('Không thể khởi động API:', err.message);
  process.exit(1);
});
