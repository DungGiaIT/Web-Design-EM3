import { ApiService } from './services/apiService.js';
import { ProductGridComponent } from './components/productGridComponent.js';
import { ProductFormComponent } from './components/productFormComponent.js';

const apiService = new ApiService();
const productGrid = document.getElementById('product-grid');
const modalRoot = document.getElementById('modal-root');

async function loadProducts() {
	const products = await apiService.getAll();
	gridComponent.render(products);
}

const formComponent = new ProductFormComponent(modalRoot, {
	onSubmit: async (productData, product) => {
		if (product) {
			await apiService.put(product.id, productData);
		} else {
			await apiService.create(productData);
		}
		await loadProducts();
	}
});
const gridComponent = new ProductGridComponent(productGrid, {
	onEdit: (product) => {
		formComponent.open(product);
	},
	onDelete: async (product) => {
		if (!confirm(`Bạn có chắc muốn xóa ${product.name}?`)) return;

		try {
			await apiService.delete(product.id);
			productGrid.querySelector(`[data-id="${product.id}"]`)?.remove();
		} catch (error) {
			alert(error.message);
		}
	}
});

document.getElementById('btn-open-add-modal').addEventListener('click', () => {
	formComponent.open();
});

loadProducts()
	.catch((error) => {
		productGrid.innerHTML = `<p class="error-message">${error.message}</p>`;
	});
