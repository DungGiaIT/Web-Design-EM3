require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Sử dụng EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Sử dụng routes
app.use('/api', productRoutes);
app.get('/', (req, res) => res.redirect('/api/products'));

// Chạy ứng dụng
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
