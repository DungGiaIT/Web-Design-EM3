# Shop Mongo

Bài thực hành Express MVC + MongoDB + Next.js. Giao diện đọc và quản lý sản phẩm qua API; MongoDB Compass chỉ dùng để xem dữ liệu.

## Luồng hoạt động

Trình duyệt → Next.js (`:3000`) → Express API (`:3001`) → MongoDB trên Docker host (`127.0.0.1:27017`, database `digitaldb`).

- `api/models`: schema `Category`, `Product`; sản phẩm lưu tên file trong trường `image`.
- `api/routes` và `api/controllers`: CRUD sản phẩm, tìm kiếm, lọc, sắp xếp, phân trang và thống kê.
- `api/config/upload.js`: nhận ảnh JPG/PNG/WebP tối đa 5 MB; file nằm trong volume Docker `uploads_data`.
- `api/seed.js`: thêm 4 danh mục, 12 sản phẩm mẫu và tải ảnh minh họa từ các nguồn ghi trong `api/seedImages.js`. Chạy lại không tạo bản sao hay tải lại ảnh còn tồn tại.
- `web/app`: giao diện Next.js, biểu mẫu thêm/sửa/xóa và hiển thị ảnh. Route web chuyển yêu cầu từ trình duyệt tới API.

MongoDB Compass kết nối tới cùng MongoDB host tại `localhost:27017`. Trong Compass, xem `digitaldb.categories` và `digitaldb.products`; seeder không ghi vào collection `devices`. Service MongoDB container cũ đã được bỏ khỏi Compose, nhưng Compose không tự xóa dữ liệu hay volume cũ.

## Chạy và rebuild

Trên máy Docker host:

```bash
cd ~/Developer/WebDesign/EM3/Shop-mongo
docker compose config --quiet
docker compose up -d --build api web
docker compose ps
```

Mở giao diện tại <http://localhost:3000>, API tại <http://localhost:3001/api/products>, healthcheck tại <http://localhost:3001/health>. Nếu cổng `3000` đang bận, đặt `WEB_PORT=3002` trong `.env` ở thư mục gốc rồi chạy lại; mở `http://localhost:3002`.

Để thêm dữ liệu mẫu và ảnh, chạy:

```bash
docker compose run --rm seed
```

Lần đầu cần Internet để tải 12 ảnh. Ảnh lưu trong volume `uploads_data`, còn MongoDB chỉ lưu tên file và thông tin nguồn. Nếu tải một ảnh thất bại, chạy lại lệnh để tiếp tục những ảnh còn thiếu. Seeder giữ nguyên giá, mô tả và ảnh hiện có khi chạy lại; ảnh đã xóa sẽ được tải lại nếu bạn chạy seed lần nữa.

Xem log: `docker compose logs --tail=100 api web`. Portainer có thể xem trạng thái ở **Stacks → shop-mongo**; stack này được tạo từ Compose trên host nên Portainer báo quyền quản lý hạn chế.

API và seed dùng `network_mode: host` để `127.0.0.1:27017` trỏ tới MongoDB trên máy Linux. Web dùng `host.docker.internal:3001` để gọi API. Dữ liệu MongoDB nằm trên host; ảnh upload nằm trong volume `uploads_data`. `docker compose down` giữ volume ảnh, còn `docker compose down -v` xóa volume đó.

## Thao tác trên giao diện

Trang chủ có bộ lọc và danh sách sản phẩm. Biểu mẫu **Thêm sản phẩm** yêu cầu tên, giá, số lượng và danh mục; ảnh là tùy chọn. Nút **Sửa** cho phép thay ảnh hoặc đánh dấu **Xóa ảnh hiện tại**. Nút **Xóa** xóa sản phẩm và ảnh đi kèm. 12 sản phẩm mẫu có ảnh phù hợp sau khi chạy seed; liên kết nguồn/giấy phép nằm ngay dưới ảnh. Ảnh Anker lấy từ trang sản phẩm của Anker, các ảnh còn lại từ Wikimedia Commons theo giấy phép ghi trên trang nguồn.

## API chính

| Method | Endpoint | Chức năng |
| --- | --- | --- |
| GET | `/api/products` | Danh sách, tìm kiếm, lọc, sắp xếp, phân trang |
| GET | `/api/products/:id` | Chi tiết |
| POST | `/api/products` | Thêm sản phẩm, nhận `multipart/form-data` với file `image` |
| PUT | `/api/products/:id` | Sửa hoặc thay ảnh; `removeImage=true` để xóa ảnh |
| DELETE | `/api/products/:id` | Xóa sản phẩm và ảnh |
| GET | `/uploads/:filename` | Xem ảnh đã tải lên |
| GET | `/api/products/avg` | Giá trung bình theo danh mục |
| PUT | `/api/products/increase` | Tăng giá 10% theo danh mục |
| DELETE | `/api/products/delete-category` | Xóa sản phẩm theo danh mục |
| GET | `/api/categories` | Danh sách danh mục |

Ví dụ lọc: `/api/products?q=iphone&maxPrice=30000000&sort=price_asc&page=1&limit=6`.

Ảnh được lưu dưới tên UUID mới, không dùng tên file gốc. API xóa file mới nếu tạo/sửa sản phẩm bị lỗi, xóa file cũ sau khi thay ảnh và xóa file khi xóa sản phẩm. Đây là bài demo không có đăng nhập hoặc phân quyền, nên chỉ chạy trong môi trường học tập đáng tin cậy.
