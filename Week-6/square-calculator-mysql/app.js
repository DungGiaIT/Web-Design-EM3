require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const squareRoutes = require('./routes/squareRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', squareRoutes);
app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`MySQL app is running on http://localhost:${PORT}`);
});
