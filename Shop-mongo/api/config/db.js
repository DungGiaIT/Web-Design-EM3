const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopdb';
  const options = { serverSelectionTimeoutMS: 10000 };

  if (process.env.MONGO_USER) options.user = process.env.MONGO_USER;
  if (process.env.MONGO_PASSWORD) options.pass = process.env.MONGO_PASSWORD;
  if (process.env.MONGO_USER) options.authSource = 'admin';

  await mongoose.connect(uri, options);
  console.log('MongoDB đã kết nối');
}

module.exports = connectDB;

