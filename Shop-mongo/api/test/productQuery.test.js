const test = require('node:test');
const assert = require('node:assert/strict');
const { buildProductQuery, escapeRegex } = require('../utils/productQuery');

test('phân trang có mặc định an toàn và giới hạn tối đa', () => {
  assert.deepEqual(buildProductQuery({ page: '-2', limit: '999' }).page, 1);
  assert.equal(buildProductQuery({ page: '2', limit: '999' }).limit, 50);
  assert.equal(buildProductQuery({ page: '2', limit: '6' }).skip, 6);
});

test('tạo filter và sort từ query', () => {
  const result = buildProductQuery({
    q: 'iPhone (15)',
    category: 'category-id',
    maxPrice: '30000000',
    sort: 'price_asc',
  });

  assert.deepEqual(result.filter, {
    name: { $regex: 'iPhone \\(15\\)', $options: 'i' },
    categoryId: 'category-id',
    price: { $lte: 30000000 },
  });
  assert.deepEqual(result.sort, { price: 1, name: 1 });
  assert.equal(escapeRegex('a+b?'), 'a\\+b\\?');
});

test('từ chối giá tối đa không hợp lệ', () => {
  assert.throws(() => buildProductQuery({ maxPrice: '-1' }), /số không âm/);
});

