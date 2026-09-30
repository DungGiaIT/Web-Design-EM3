require('dotenv').config();  															
const express = require('express');  															
const bodyParser = require('body-parser');  															
const mongoose = require('mongoose');  															
const squareRoutes = require('./routes/squareRoutes');  															
															
const app = express(); 
 															
const PORT = process.env.PORT || 3000;  		


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', squareRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });