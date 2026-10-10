const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
});

const productFields = `
  id, id AS legacyId, name, category, description,
  unit_price AS unitPrice, promotion_price AS promotionPrice,
  image, unit, section, display_order AS displayOrder
`;

async function getProductsBySection(section, limit) {
  let sql = `SELECT ${productFields} FROM products WHERE section = ? ORDER BY display_order ASC, id ASC`;
  const params = [section];
  if (limit) {
    sql += ' LIMIT ?';
    params.push(Number(limit));
  }
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getProducts({ section, query } = {}) {
  const conditions = [];
  const params = [];

  if (['new', 'top', 'catalog'].includes(section)) {
    conditions.push('section = ?');
    params.push(section);
  }
  if (query) {
    conditions.push('name LIKE ?');
    params.push(`%${query}%`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT ${productFields} FROM products ${where} ORDER BY display_order ASC, id ASC`,
    params
  );
  return rows;
}

async function getProductById(id) {
  const [rows] = await pool.query(`SELECT ${productFields} FROM products WHERE id = ?`, [id]);
  return rows[0] || null;
}

async function getRelatedProducts(category, id) {
  const [rows] = await pool.query(
    `SELECT ${productFields} FROM products WHERE category = ? AND id <> ? ORDER BY display_order ASC, id ASC LIMIT 4`,
    [category, id]
  );
  return rows;
}

module.exports = {
  getProductsBySection,
  getProducts,
  getProductById,
  getRelatedProducts
};
