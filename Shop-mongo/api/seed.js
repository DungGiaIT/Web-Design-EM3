require('dotenv').config();

const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const { randomUUID } = require('crypto');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');
const { uploadDir, removeImageFile } = require('./config/upload');
const seedImages = require('./seedImages');

const seedProducts = [
  ['iPhone 15', 22990000, 18, 'Điện thoại Apple', 'Điện thoại'],
  ['Samsung Galaxy S24', 19990000, 24, 'Điện thoại Samsung', 'Điện thoại'],
  ['Google Pixel 9', 18990000, 12, 'Điện thoại Google', 'Điện thoại'],
  ['MacBook Air M3', 27990000, 9, 'Laptop mỏng nhẹ', 'Laptop'],
  ['Dell XPS 13', 32990000, 7, 'Laptop Windows cao cấp', 'Laptop'],
  ['ASUS Vivobook 15', 15990000, 16, 'Laptop học tập và văn phòng', 'Laptop'],
  ['iPad Air', 16990000, 14, 'Máy tính bảng Apple', 'Máy tính bảng'],
  ['Galaxy Tab S9', 17990000, 11, 'Máy tính bảng Samsung', 'Máy tính bảng'],
  ['AirPods Pro 2', 5990000, 30, 'Tai nghe chống ồn', 'Phụ kiện'],
  ['Logitech MX Master 3S', 2490000, 28, 'Chuột không dây', 'Phụ kiện'],
  ['Keychron K8', 2190000, 20, 'Bàn phím cơ', 'Phụ kiện'],
  ['Anker 737 Power Bank', 3290000, 25, 'Pin sạc dự phòng', 'Phụ kiện'],
];

async function imageExists(filename) {
  if (!filename || !/^[0-9a-f-]{36}\.(jpg|png|webp)$/.test(filename)) return false;
  try {
    return (await fs.stat(path.join(uploadDir, filename))).size > 0;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function downloadImage(name, source) {
  const response = await fetch(source.url, {
    headers: { 'User-Agent': 'ShopMongoEducationalDemo/1.0 (classroom project)' },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} khi tải ảnh ${name}`);
  const mime = response.headers.get('content-type')?.split(';')[0];
  if (mime !== source.mime) throw new Error(`Định dạng ảnh ${name} không đúng: ${mime}`);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0 || bytes.length > 5 * 1024 * 1024) {
    throw new Error(`Ảnh ${name} rỗng hoặc lớn hơn 5 MB`);
  }

  const filename = `${randomUUID()}.${source.ext}`;
  await fs.writeFile(path.join(uploadDir, filename), bytes, { flag: 'wx' });
  return filename;
}

async function seed() {
  await connectDB();

  const categoryNames = [...new Set(seedProducts.map((product) => product[4]))];
  await Promise.all(
    categoryNames.map((name) =>
      Category.updateOne({ name }, { $setOnInsert: { name } }, { upsert: true }),
    ),
  );

  const categories = await Category.find({ name: { $in: categoryNames } }).lean();
  const categoryIds = Object.fromEntries(categories.map((category) => [category.name, category._id]));

  await Promise.all(
    seedProducts.map(([name, price, stock, description, category]) =>
      Product.updateOne(
        { name },
        { $setOnInsert: { name, price, stock, description, categoryId: categoryIds[category] } },
        { upsert: true, runValidators: true },
      ),
    ),
  );

  let imagesAdded = 0;
  for (const [name] of seedProducts) {
    const source = seedImages[name];
    if (!source) throw new Error(`Thiếu nguồn ảnh cho ${name}`);

    const product = await Product.findOne({ name }).select('image');
    if (await imageExists(product.image)) continue;

    let filename;
    try {
      filename = await downloadImage(name, source);
      const result = await Product.updateOne(
        { _id: product._id, image: product.image || null },
        { $set: { image: filename, imageCredit: source.credit, imageSourceUrl: source.page } },
      );
      if (!result.modifiedCount) {
        await removeImageFile(filename);
        continue;
      }
      imagesAdded += 1;
      console.log(`Đã thêm ảnh: ${name}`);
    } catch (error) {
      if (filename) await removeImageFile(filename).catch(console.error);
      throw new Error(`Không thể thêm ảnh cho ${name}: ${error.message}`);
    }
  }

  console.log(`Seeder hoàn tất: ${categoryNames.length} category, ${seedProducts.length} product, ${imagesAdded} ảnh mới`);
}

seed()
  .catch((err) => {
    console.error('Seeder thất bại:', err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
