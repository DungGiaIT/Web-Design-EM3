
const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220" viewBox="0 0 300 220"><rect width="300" height="220" fill="#eeeeee"/><text x="150" y="112" text-anchor="middle" font-family="Arial" font-size="18" fill="#777">No image</text></svg>'
)}`;

export class ProductCardComponent {
    constructor(product, { onEdit, onDelete } = {}) {
        this.product = product;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
    }

    render() {
        const cardElement = document.createElement('article');
        cardElement.className = 'product-card';
        cardElement.dataset.id = this.product.id;
        cardElement.innerHTML = `
            <div class="card-image-wrapper">
                <img
                    src="${this.product.image}"
                    alt="${this.product.name}"
                    class="card-main-image"
                    onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
                />
            </div>
            <div class="card-info">
                <h3 class="card-name" title="${this.product.name}">${this.product.name}</h3>
                <p class="card-description">${this.product.description}</p>
                <div class="card-price-row">
                    <span class="card-price">${this.product.formattedPrice}</span>
                </div>
                <p class="card-stock">Còn lại: ${this.product.quantity}</p>
                <div class="card-actions">
                    <button type="button" class="btn btn-edit">Sửa</button>
                    <button type="button" class="btn btn-danger">Xóa</button>
                </div>
            </div>
        `;

        cardElement.querySelector('.btn-edit').addEventListener('click', () => {
            this.onEdit?.(this.product);
        });
        cardElement.querySelector('.btn-danger').addEventListener('click', () => {
            this.onDelete?.(this.product);
        });

        return cardElement;
    }
}