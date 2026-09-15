export class ProductFormComponent {
    constructor(modalRoot, { onSubmit } = {}) {
        this.modalRoot = modalRoot;
        this.onSubmit = onSubmit;
    }

    open(product = null) {
        const isEdit = product !== null;
        this.modalRoot.innerHTML = `
            <div class="modal-backdrop">
                <section class="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                    <div class="modal-header">
                        <h2 id="modal-title">${isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
                        <button type="button" class="modal-close" aria-label="Đóng">&times;</button>
                    </div>
                    <form class="product-form">
                        <label>Tên sản phẩm<input name="name" required /></label>
                        <label>Ảnh sản phẩm<input name="image" type="url" /></label>
                        <label>Giá<input name="price" type="number" min="0" required /></label>
                        <label>Số lượng<input name="quantity" type="number" min="0" required /></label>
                        <label>Quốc gia<input name="country" /></label>
                        <label>Mô tả<textarea name="description" rows="3"></textarea></label>
                        <p class="form-error" aria-live="polite"></p>
                        <div class="modal-actions">
                            <button type="button" class="btn btn-secondary modal-cancel">Hủy</button>
                            <button type="submit" class="btn btn-primary">${isEdit ? 'Lưu thay đổi' : 'Thêm sản phẩm'}</button>
                        </div>
                    </form>
                </section>
            </div>
        `;

        const form = this.modalRoot.querySelector('.product-form');
        this.fillForm(form, product);
        this.bindEvents(form, product);
    }

    close() {
        this.modalRoot.innerHTML = '';
    }

    fillForm(form, product) {
        if (!product) return;

        form.elements.name.value = product.name;
        form.elements.image.value = product.image.startsWith('data:') ? '' : product.image;
        form.elements.price.value = product.price;
        form.elements.quantity.value = product.quantity;
        form.elements.country.value = product.country;
        form.elements.description.value = product.description;
    }

    bindEvents(form, product) {
        this.modalRoot.querySelector('.modal-close').addEventListener('click', () => this.close());
        this.modalRoot.querySelector('.modal-cancel').addEventListener('click', () => this.close());
        this.modalRoot.querySelector('.modal-backdrop').addEventListener('click', (event) => {
            if (event.target === event.currentTarget) this.close();
        });
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const productData = {
                name: formData.get('name').trim(),
                image: formData.get('image').trim(),
                price: Number(formData.get('price')),
                quantity: Number(formData.get('quantity')),
                country: formData.get('country').trim() || 'Vietnam',
                description: formData.get('description').trim()
            };

            try {
                await this.onSubmit(productData, product);
                this.close();
            } catch (error) {
                form.querySelector('.form-error').textContent = error.message;
            }
        });
    }
}
