CREATE DATABASE IF NOT EXISTS shopdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shopdb;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT UNSIGNED NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  promotion_price DECIMAL(10, 2) NULL,
  image VARCHAR(255) NOT NULL,
  unit VARCHAR(30) NOT NULL DEFAULT 'cái',
  section ENUM('new', 'top', 'catalog') NOT NULL DEFAULT 'catalog',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO products
  (id, name, category, description, unit_price, promotion_price, image, unit, section, display_order)
VALUES
  (62, 'Bánh Sachertorte', 'Bánh ngọt', 'Bánh chocolate nổi tiếng của nước Áo, xen giữa các lớp bánh là mứt mơ thơm dịu.', 250000, 220000, '111.jpg', 'cái', 'new', 1),
  (61, 'Bánh Cupcake - Anh Quốc', 'Bánh ngọt', 'Cupcake mềm mịn, phủ kem trang trí nhiều màu sắc.', 150000, 120000, 'cupcake.jpg', 'cái', 'new', 2),
  (60, 'Bánh Táo - Mỹ', 'Bánh ngọt', 'Vỏ bánh giòn mềm với nhân táo thơm ngọt, điểm vị chua dịu của trái cây.', 200000, 200000, '1234.jpg', 'cái', 'new', 3),
  (59, 'Bánh Tiramisu - Italia', 'Bánh ngọt', 'Tiramisu mềm béo với coffee, cacao và lớp kem phô mai hòa quyện.', 200000, 200000, '234.jpg', 'cái', 'new', 4),
  (1, 'Bánh Crepe Sầu riêng', 'Bánh crepe', 'Crepe mềm mịn kết hợp cùng kem và sầu riêng thơm béo.', 150000, 120000, '1430967449-pancake-sau-rieng-6.jpg', 'hộp', 'top', 1),
  (2, 'Bánh Crepe Chocolate', 'Bánh crepe', 'Crepe chocolate ngọt vừa, thơm đậm vị cacao.', 180000, 160000, 'crepe-chocolate.jpg', 'hộp', 'top', 2),
  (3, 'Bánh Crepe Sầu riêng - Chuối', 'Bánh crepe', 'Sầu riêng và chuối hòa quyện trong lớp crepe mềm mỏng.', 150000, 120000, 'crepe-chuoi.jpg', 'hộp', 'top', 3),
  (6, 'Bánh Crepe Pháp', 'Bánh crepe', 'Crepe kiểu Pháp dùng kèm kem tươi và sốt chocolate.', 200000, 180000, 'crepe-phap.jpg', 'hộp', 'top', 4),
  (4, 'Bánh Crepe Đào', 'Bánh crepe', 'Crepe nhân đào thanh mát.', 160000, 160000, 'crepe-dao.jpg', 'hộp', 'catalog', 1),
  (5, 'Bánh Crepe Dâu', 'Bánh crepe', 'Crepe dâu tươi với kem sữa mềm mịn.', 160000, 160000, 'crepedau.jpg', 'hộp', 'catalog', 2),
  (7, 'Bánh Crepe Táo', 'Bánh crepe', 'Crepe nhân táo thơm nhẹ.', 160000, 160000, 'crepe-tao.jpg', 'hộp', 'catalog', 3),
  (8, 'Bánh Crepe Trà xanh', 'Bánh crepe', 'Vị trà xanh dịu nhẹ trong lớp bánh crepe mềm.', 160000, 150000, 'crepe-traxanh.jpg', 'hộp', 'catalog', 4),
  (11, 'Bánh Gato Trái cây Việt Quất', 'Bánh trái cây', 'Bánh gato mềm xốp phủ kem và trái cây tươi.', 250000, 250000, '544bc48782741.png', 'cái', 'catalog', 5),
  (12, 'Bánh sinh nhật rau câu trái cây', 'Bánh trái cây', 'Bánh rau câu mát lạnh với nhiều loại trái cây.', 200000, 180000, '210215-banh-sinh-nhat-rau-cau-body- (6).jpg', 'cái', 'catalog', 6),
  (13, 'Bánh kem Chocolate Dâu', 'Bánh kem', 'Bánh kem chocolate kết hợp dâu tươi.', 300000, 280000, 'banh kem sinh nhat.jpg', 'cái', 'catalog', 7),
  (14, 'Bánh kem Dâu', 'Bánh kem', 'Bánh kem dâu ngọt thanh, trang trí đẹp mắt.', 300000, 280000, 'Banh-kem (6).jpg', 'cái', 'catalog', 8),
  (16, 'Bánh trái cây', 'Bánh trái cây', 'Bánh trái cây mềm thơm, nhiều màu sắc tự nhiên.', 150000, 120000, 'banhtraicay.jpg', 'hộp', 'catalog', 9),
  (17, 'Apple Cake', 'Bánh trái cây', 'Bánh táo thơm mềm dùng kèm trà hoặc coffee.', 250000, 240000, 'Fruit-Cake_7979.jpg', 'cái', 'catalog', 10),
  (42, 'Beefy Pizza', 'Bánh Pizza', 'Thịt bò xay, ngô, sốt BBQ và phô mai mozzarella.', 150000, 130000, '40819_food_pizza.jpg', 'cái', 'catalog', 11),
  (49, 'Bánh su kem nhân dừa', 'Bánh su kem', 'Su kem nhân dừa béo thơm, vỏ bánh nhẹ xốp.', 120000, 100000, 'maxresdefault.jpg', 'cái', 'catalog', 12);
