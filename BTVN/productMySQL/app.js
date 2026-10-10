const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./routes/index');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.formatPrice = (price) => Number(price || 0).toLocaleString('vi-VN');
  next();
});

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
