require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/square';

mongoose.connect(MONGO_URI)
  .then(() => console.log(`Connected to MongoDB: ${MONGO_URI}`))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`MongoDB app is running on http://localhost:${PORT}`);
});
