# Product List

Ứng dụng quản lý danh sách sản phẩm bằng HTML, CSS và JavaScript ES Modules.
Ứng dụng sử dụng MockAPI để thực hiện các thao tác CRUD:

- Hiển thị danh sách sản phẩm theo dạng grid 4 cột.
- Thêm sản phẩm mới.
- Chỉnh sửa thông tin sản phẩm.
- Xóa sản phẩm.
- Hiển thị ảnh dự phòng khi ảnh sản phẩm bị lỗi.

## Công nghệ

- HTML5
- CSS3 Grid và Responsive Design
- JavaScript ES Modules
- Fetch API
- MockAPI

## Cấu trúc thư mục

```text
productList/
├── README.md
└── src/
	├── index.html
	├── css/
	│   └── style.css
	└── js/
		├── app.js
		├── config.js
		├── components/
		│   ├── productCardComponent.js
		│   ├── productFormComponent.js
		│   └── productGridComponent.js
		├── model/
		│   └── product.js
		└── services/
			└── apiService.js
```

## Cách chạy

Do ứng dụng sử dụng JavaScript ES Modules, cần chạy bằng một web server tĩnh.

### Cách 1: VS Code Live Server

1. Mở thư mục `productList` bằng VS Code.
2. Cài extension **Live Server**.
3. Nhấp chuột phải vào `src/index.html`.
4. Chọn **Open with Live Server**.

### Cách 2: Python HTTP server

Mở terminal tại thư mục `productList`, sau đó chạy:

```bash
python3 -m http.server 5500 --directory src
```

Mở trình duyệt tại:

```text
http://localhost:5500
```

## Sử dụng

### Thêm sản phẩm

Nhấn nút **Thêm sản phẩm mới**, nhập thông tin rồi chọn **Thêm sản phẩm**.

### Sửa sản phẩm

Nhấn **Sửa** trên card sản phẩm, cập nhật thông tin và chọn **Lưu thay đổi**.

### Xóa sản phẩm

Nhấn **Xóa**, xác nhận thao tác, sau đó sản phẩm sẽ được xóa khỏi API và giao diện.

## API

Endpoint hiện tại được khai báo trong `src/js/config.js`:

```text
https://6aa7955a9b08676cd32b4c25.mockapi.io/product
```

`ApiService` cung cấp các phương thức:

```js
getAll();
getById(id);
create(productData);
put(id, productData);
delete(id);
```

## Luồng xử lý

```text
ApiService
	↓
Product model
	↓
ProductGridComponent
	↓
ProductCardComponent
	↓
ProductFormComponent
```

- `ApiService`: gọi API và xử lý CRUD.
- `Product`: chuẩn hóa dữ liệu sản phẩm.
- `ProductGridComponent`: render danh sách card.
- `ProductCardComponent`: hiển thị sản phẩm và xử lý nút Sửa/Xóa.
- `ProductFormComponent`: quản lý form thêm và sửa sản phẩm.

## Ghi chú

- API MockAPI cần có kết nối mạng.
- Trường tên, giá và số lượng là bắt buộc.
- Nếu URL ảnh không hợp lệ, ứng dụng sẽ hiển thị ảnh dự phòng.
