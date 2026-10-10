# Thiết kế Shop Mongo

## Phạm vi đã xác nhận

- Tạo một project học tập gồm MongoDB, Express API và Next.js.
- Chạy API và Next.js bằng Docker Compose, kết nối MongoDB sẵn có trên máy host.
- API dùng mô hình MVC, có CRUD, tìm kiếm, lọc, sắp xếp, phân trang, aggregate và populate.
- Có seeder chạy lại an toàn và tải ảnh minh họa có nguồn; giao diện Next.js đọc dữ liệu từ API và quản lý ảnh sản phẩm.
- Không triển khai đăng nhập, phân quyền hoặc yêu cầu high availability.

## Giả định

- Project chạy trên một Docker host, phục vụ mục đích học tập và lượng dữ liệu nhỏ.
- MongoDB chạy sẵn trên host tại `127.0.0.1:27017`, database `digitaldb`.
- Ảnh tải lên lưu trong Docker named volume; Next.js gọi API qua host gateway.
- Người duy trì project quen với Docker Compose hoặc giao diện Portainer Stacks.

## Phương án đã xem xét

1. **Web và API trong Compose, dùng MongoDB host (đã chọn):** dùng đúng database `digitaldb` đang mở trong Compass.
2. **Thêm MongoDB container vào Compose:** độc lập hơn nhưng tạo database khác với MongoDB host.
3. **Express + EJS + MongoDB:** ít container hơn nhưng không đáp ứng yêu cầu Next.js.

## Thiết kế cuối cùng

- MongoDB trên host lưu `digitaldb`; Compass là công cụ xem cùng database.
- `seed`: upsert category và product mẫu, tải ảnh vào volume khi sản phẩm chưa có ảnh còn tồn tại, chạy thủ công khi cần.
- `api`: Express + Mongoose; model `Product` tham chiếu `Category`; Multer lưu ảnh trong volume `uploads_data`.
- `web`: Next.js App Router render phía server, gọi API qua `host.docker.internal:3001`; route web chuyển yêu cầu CRUD và ảnh tới API.
- Luồng dữ liệu: trình duyệt → Next.js → Express API → MongoDB.
- Lỗi đầu vào trả JSON 400/404/409/413/415; lỗi kết nối làm healthcheck thất bại để Portainer hiển thị đúng trạng thái.

## Kiểm thử

- Unit test bằng `node:test` cho bộ phân tích query lọc/sắp xếp/phân trang.
- Build production cho API và Next.js.
- Kiểm tra `docker compose config`, healthcheck và API sau khi stack khởi động.

## Nhật ký quyết định

- Giữ API và web trong Docker; kết nối MongoDB host để dùng cùng `digitaldb` đang được xem trong Compass.
- Chọn Next.js Server Component để không cần thêm state library hoặc CORS cho trang danh sách.
- Chọn seeder idempotent bằng `updateOne(..., { upsert: true })` để deploy lại không nhân bản dữ liệu.
- Giữ API nhỏ, không thêm repository/service layer vì controller + Mongoose đã đủ cho bài học.
- Dùng Multer như bài `shop-api`; lưu file trong volume và chỉ lưu tên file trong MongoDB để ảnh vẫn còn khi rebuild container.
