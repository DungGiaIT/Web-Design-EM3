import Link from 'next/link';
import ProductManager from './ProductManager';

export const dynamic = 'force-dynamic';

const apiUrl = process.env.API_INTERNAL_URL || 'http://localhost:3001';

function valueOf(value) {
  return Array.isArray(value) ? value[0] : value || '';
}

function pageHref(filters, page) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value && key !== 'page') params.set(key, value);
  }
  params.set('page', String(page));
  return `/?${params.toString()}`;
}

async function loadShopData(filters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  params.set('limit', '6');

  const [productsResponse, categoriesResponse] = await Promise.all([
    fetch(`${apiUrl}/api/products?${params}`, { cache: 'no-store' }),
    fetch(`${apiUrl}/api/categories`, { cache: 'no-store' }),
  ]);

  if (!productsResponse.ok || !categoriesResponse.ok) {
    throw new Error('API không phản hồi thành công');
  }

  return {
    products: await productsResponse.json(),
    categories: await categoriesResponse.json(),
  };
}

export default async function Home({ searchParams }) {
  const rawParams = await searchParams;
  const filters = {
    q: valueOf(rawParams.q),
    category: valueOf(rawParams.category),
    maxPrice: valueOf(rawParams.maxPrice),
    sort: valueOf(rawParams.sort),
    page: valueOf(rawParams.page) || '1',
  };

  let data;
  let error;
  try {
    data = await loadShopData(filters);
  } catch (err) {
    console.error(err);
    error = 'Không thể tải dữ liệu. Hãy kiểm tra trạng thái API và MongoDB.';
  }

  const items = data?.products.items || [];
  const pagination = data?.products.pagination || { page: 1, total: 0, totalPages: 1 };

  return (
    <main>
      <header className="hero">
        <div>
          <span className="eyebrow">MongoDB · Express · Next.js</span>
          <h1>Shop Mongo</h1>
          <p>Dữ liệu sản phẩm được đọc trực tiếp từ Express API và MongoDB.</p>
        </div>
        <div className="total">
          <strong>{pagination.total}</strong>
          <span>sản phẩm</span>
        </div>
      </header>

      <section className="panel" aria-label="Bộ lọc sản phẩm">
        <form>
          <label>
            Tìm kiếm
            <input name="q" defaultValue={filters.q} placeholder="Tên sản phẩm" />
          </label>
          <label>
            Danh mục
            <select name="category" defaultValue={filters.category}>
              <option value="">Tất cả</option>
              {(data?.categories || []).map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label>
            Giá tối đa
            <input name="maxPrice" type="number" min="0" defaultValue={filters.maxPrice} placeholder="30000000" />
          </label>
          <label>
            Sắp xếp
            <select name="sort" defaultValue={filters.sort}>
              <option value="newest">Mới nhất</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
              <option value="name_asc">Tên A–Z</option>
            </select>
          </label>
          <div className="actions">
            <button type="submit">Áp dụng</button>
            <Link href="/">Đặt lại</Link>
          </div>
        </form>
      </section>

      {error ? <p className="message error" role="alert">{error}</p> : (
        <ProductManager items={items} categories={data?.categories || []} />
      )}

      {!error && pagination.totalPages > 1 && (
        <nav className="pagination" aria-label="Phân trang">
          {pagination.page > 1 && <Link href={pageHref(filters, pagination.page - 1)}>Trước</Link>}
          {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => (
            <Link
              className={page === pagination.page ? 'active' : ''}
              href={pageHref(filters, page)}
              key={page}
              aria-current={page === pagination.page ? 'page' : undefined}
            >
              {page}
            </Link>
          ))}
          {pagination.page < pagination.totalPages && <Link href={pageHref(filters, pagination.page + 1)}>Sau</Link>}
        </nav>
      )}
    </main>
  );
}
