const db = require('../config/database');

const getAllProducts = async () => {
  const [rows] = await db.query(
    'SELECT id, name, price, description FROM product ORDER BY id DESC'
  );
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await db.query(
    'SELECT id, name, price, description FROM product WHERE id = ?',
    [id]
  );
  return rows[0];
};

const createProduct = async ({ name, price, description }) => {
  const [result] = await db.query(
    'INSERT INTO product (name, price, description) VALUES (?, ?, ?)',
    [name, price, description]
  );
  return result;
};

const updateProduct = async (id, { name, price, description }) => {
  const [result] = await db.query(
    'UPDATE product SET name = ?, price = ?, description = ? WHERE id = ?',
    [name, price, description, id]
  );
  return result.affectedRows > 0;
};

const deleteProduct = async (id) => {
  const [result] = await db.query('DELETE FROM product WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
