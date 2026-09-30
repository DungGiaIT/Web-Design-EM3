const db = require('../config/database');

const saveSquareData = (sideLength, perimeter, area) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO square (sideLength, perimeter, area) VALUES (?, ?, ?)';
    db.query(sql, [sideLength, perimeter, area], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { saveSquareData };
