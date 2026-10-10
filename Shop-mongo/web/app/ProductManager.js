'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

export default function ProductManager({ items, categories }) {
  const router = useRouter();
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function edit(product) {
    setEditing(product);
    setError('');
    document.getElementById('product-form')?.scrollIntoView({ behavior: 'smooth' });
  }

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!data.get('image')?.size) data.delete('image');
    setBusy(true);
    setError('');

    try {
      const response = await fetch(editing ? `/api/products/${editing._id}` : '/api/products', {
        method: editing ? 'PUT' : 'POST',
        body: data,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Không lưu được sản phẩm');
      setEditing(null);
      form.reset();
      router.refresh();
    } catch (cause) {
      setError(cause.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(product) {
    if (!window.confirm(`Xóa sản phẩm “${product.name}” và ảnh của nó?`)) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`/api/products/${product._id}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Không xóa được sản phẩm');
      if (editing?._id === product._id) setEditing(null);
      router.refresh();
    } catch (cause) {
      setError(cause.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className="panel" id="product-form" aria-label="Thêm hoặc sửa sản phẩm">
        <h2>{editing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
        <form className="product-form" key={editing?._id || 'new'} onSubmit={submit}>
          <label>Tên sản phẩm
            <input name="name" required defaultValue={editing?.name || ''} />
          </label>
          <label>Giá (đồng)
            <input name="price" type="number" min="0" step="1" required defaultValue={editing?.price ?? ''} />
          </label>
          <label>Số lượng
            <input name="stock" type="number" min="0" step="1" required defaultValue={editing?.stock ?? 0} />
          </label>
          <label>Danh mục
            <select name="categoryId" required defaultValue={editing?.categoryId?._id || ''}>
              <option value="">Chọn danh mục</option>
              {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
            </select>
          </label>
          <label className="wide">Mô tả
            <input name="description" defaultValue={editing?.description || ''} />
          </label>
          <label className="wide">Ảnh sản phẩm (JPG, PNG, WebP; tối đa 5 MB)
            <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
          </label>
          {editing?.image && (
            <label className="remove-image"><input name="removeImage" type="checkbox" value="true" /> Xóa ảnh hiện tại</label>
          )}
          <div className="actions wide">
            <button type="submit" disabled={busy}>{busy ? 'Đang lưu…' : editing ? 'Lưu thay đổi' : 'Thêm sản phẩm'}</button>
            {editing && <button type="button" className="secondary" disabled={busy} onClick={() => setEditing(null)}>Hủy sửa</button>}
          </div>
        </form>
        {error && <p className="message error" role="alert">{error}</p>}
      </section>

      {items.length === 0 ? (
        <p className="message">Không có sản phẩm phù hợp.</p>
      ) : (
        <section className="grid" aria-label="Danh sách sản phẩm">
          {items.map((product) => (
            <article className="card" key={product._id}>
              {product.image ? (
                <img className="product-image" src={`/uploads/${encodeURIComponent(product.image)}`} alt={product.name} />
              ) : <div className="product-image placeholder">Chưa có ảnh</div>}
              {product.imageSourceUrl && <a className="image-credit" href={product.imageSourceUrl} target="_blank" rel="noopener noreferrer">Ảnh: {product.imageCredit}</a>}
              <div className="card-top">
                <span className="category">{product.categoryId?.name || 'Chưa phân loại'}</span>
                <span className={product.stock > 0 ? 'stock' : 'stock out'}>
                  {product.stock > 0 ? `Còn ${product.stock}` : 'Hết hàng'}
                </span>
              </div>
              <h2>{product.name}</h2>
              <p>{product.description || 'Chưa có mô tả.'}</p>
              <strong className="price">{currency.format(product.price)}</strong>
              <div className="card-actions">
                <button type="button" className="secondary" disabled={busy} onClick={() => edit(product)}>Sửa</button>
                <button type="button" className="danger" disabled={busy} onClick={() => remove(product)}>Xóa</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
