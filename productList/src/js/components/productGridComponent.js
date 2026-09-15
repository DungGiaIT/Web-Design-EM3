import { Product } from '../model/product.js';
import { ProductCardComponent } from './productCardComponent.js';

export class ProductGridComponent {
    constructor(container, { onEdit, onDelete } = {}) {
        this.container = container;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
    }

    render(productDataList = []) {
        this.container.innerHTML = '';

        if (productDataList.length === 0) {
            this.container.innerHTML = '<p class="empty-message">Chưa có sản phẩm nào.</p>';
            return;
        }

        productDataList.forEach((productData) => {
            const product = productData instanceof Product
                ? productData
                : new Product(productData);
            const card = new ProductCardComponent(product, {
                onEdit: this.onEdit,
                onDelete: this.onDelete
            });

            this.container.appendChild(card.render());
        });
    }
}
