const MAX_LIMIT = 50;

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function buildProductQuery(query = {}) {
  const page = positiveInteger(query.page, 1);
  const limit = Math.min(positiveInteger(query.limit, 10), MAX_LIMIT);
  const filter = {};

  if (query.q) {
    const keyword = String(query.q).trim();
    if (keyword.length > 100) throw badRequest('Từ khóa tối đa 100 ký tự');
    if (keyword) filter.name = { $regex: escapeRegex(keyword), $options: 'i' };
  }

  if (query.category) filter.categoryId = query.category;

  if (query.maxPrice !== undefined && query.maxPrice !== '') {
    const maxPrice = Number(query.maxPrice);
    if (!Number.isFinite(maxPrice) || maxPrice < 0) {
      throw badRequest('Giá tối đa phải là số không âm');
    }
    filter.price = { $lte: maxPrice };
  }

  const sortKey = query.sort || (query.order ? `price_${query.order}` : 'newest');
  const sortOptions = {
    newest: { createdAt: -1 },
    price_asc: { price: 1, name: 1 },
    price_desc: { price: -1, name: 1 },
    name_asc: { name: 1 },
  };

  return {
    filter,
    sort: sortOptions[sortKey] || sortOptions.newest,
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

module.exports = { buildProductQuery, escapeRegex };

