const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/database');
const Product = require('./models/Product');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/admin', adminRoutes);

app.get('/', (req, res) => res.redirect('/admin'));

// Tạo bảng và seed data (100 sản phẩm)
(async () => {
  await sequelize.sync();
  const count = await Product.count();
  if (count === 0) {
    const demoData = [];
    for (let i = 1; i <= 100; i++) {
      demoData.push({
        name: `Sản phẩm ${String(i).padStart(3, '0')}`,
        price: Math.floor(Math.random() * 1000) + 100,
        image: 'https://simg.zalopay.com.vn/zlp-website/assets/Thuong_hieu_thoi_trang_nu_cao_cap_Hnoss_d2650b4e51.jpg',
        description: `Mô tả sản phẩm ${i}`
      });
    }
    await Product.bulkCreate(demoData);
    console.log('✅ Đã seed 100 sản phẩm!');
  }
})();

app.listen(3001, () => console.log('Server chạy tại http://localhost:3001'));