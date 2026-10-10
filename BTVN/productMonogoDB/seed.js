const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
  {
    legacyId: 62,
    name: 'Bánh Sachertorte',
    category: 'Bánh ngọt',
    description: 'Bánh chocolate nổi tiếng của nước Áo, xen giữa các lớp bánh là mứt mơ thơm dịu.',
    unitPrice: 250000,
    promotionPrice: 220000,
    image: '111.jpg',
    unit: 'cái',
    section: 'new',
    displayOrder: 1
  },
  {
    legacyId: 61,
    name: 'Bánh Cupcake - Anh Quốc',
    category: 'Bánh ngọt',
    description: 'Cupcake mềm mịn, phủ kem trang trí nhiều màu sắc.',
    unitPrice: 150000,
    promotionPrice: 120000,
    image: 'cupcake.jpg',
    unit: 'cái',
    section: 'new',
    displayOrder: 2
  },
  {
    legacyId: 60,
    name: 'Bánh Táo - Mỹ',
    category: 'Bánh ngọt',
    description: 'Vỏ bánh giòn mềm với nhân táo thơm ngọt, điểm vị chua dịu của trái cây.',
    unitPrice: 200000,
    promotionPrice: 200000,
    image: '1234.jpg',
    unit: 'cái',
    section: 'new',
    displayOrder: 3
  },
  {
    legacyId: 59,
    name: 'Bánh Tiramisu - Italia',
    category: 'Bánh ngọt',
    description: 'Tiramisu mềm béo với coffee, cacao và lớp kem phô mai hòa quyện.',
    unitPrice: 200000,
    promotionPrice: 200000,
    image: '234.jpg',
    unit: 'cái',
    section: 'new',
    displayOrder: 4
  },
  {
    legacyId: 1,
    name: 'Bánh Crepe Sầu riêng',
    category: 'Bánh crepe',
    description: 'Crepe mềm mịn kết hợp cùng kem và sầu riêng thơm béo.',
    unitPrice: 150000,
    promotionPrice: 120000,
    image: '1430967449-pancake-sau-rieng-6.jpg',
    unit: 'hộp',
    section: 'top',
    displayOrder: 1
  },
  {
    legacyId: 2,
    name: 'Bánh Crepe Chocolate',
    category: 'Bánh crepe',
    description: 'Crepe chocolate ngọt vừa, thơm đậm vị cacao.',
    unitPrice: 180000,
    promotionPrice: 160000,
    image: 'crepe-chocolate.jpg',
    unit: 'hộp',
    section: 'top',
    displayOrder: 2
  },
  {
    legacyId: 3,
    name: 'Bánh Crepe Sầu riêng - Chuối',
    category: 'Bánh crepe',
    description: 'Sầu riêng và chuối hòa quyện trong lớp crepe mềm mỏng.',
    unitPrice: 150000,
    promotionPrice: 120000,
    image: 'crepe-chuoi.jpg',
    unit: 'hộp',
    section: 'top',
    displayOrder: 3
  },
  {
    legacyId: 6,
    name: 'Bánh Crepe Pháp',
    category: 'Bánh crepe',
    description: 'Crepe kiểu Pháp dùng kèm kem tươi và sốt chocolate.',
    unitPrice: 200000,
    promotionPrice: 180000,
    image: 'crepe-phap.jpg',
    unit: 'hộp',
    section: 'top',
    displayOrder: 4
  },
  {
    legacyId: 4,
    name: 'Bánh Crepe Đào',
    category: 'Bánh crepe',
    description: 'Crepe nhân đào thanh mát.',
    unitPrice: 160000,
    promotionPrice: 160000,
    image: 'crepe-dao.jpg',
    unit: 'hộp',
    section: 'catalog',
    displayOrder: 1
  },
  {
    legacyId: 5,
    name: 'Bánh Crepe Dâu',
    category: 'Bánh crepe',
    description: 'Crepe dâu tươi với kem sữa mềm mịn.',
    unitPrice: 160000,
    promotionPrice: 160000,
    image: 'crepedau.jpg',
    unit: 'hộp',
    section: 'catalog',
    displayOrder: 2
  },
  {
    legacyId: 7,
    name: 'Bánh Crepe Táo',
    category: 'Bánh crepe',
    description: 'Crepe nhân táo thơm nhẹ.',
    unitPrice: 160000,
    promotionPrice: 160000,
    image: 'crepe-tao.jpg',
    unit: 'hộp',
    section: 'catalog',
    displayOrder: 3
  },
  {
    legacyId: 8,
    name: 'Bánh Crepe Trà xanh',
    category: 'Bánh crepe',
    description: 'Vị trà xanh dịu nhẹ trong lớp bánh crepe mềm.',
    unitPrice: 160000,
    promotionPrice: 150000,
    image: 'crepe-traxanh.jpg',
    unit: 'hộp',
    section: 'catalog',
    displayOrder: 4
  },
  {
    legacyId: 11,
    name: 'Bánh Gato Trái cây Việt Quất',
    category: 'Bánh trái cây',
    description: 'Bánh gato mềm xốp phủ kem và trái cây tươi.',
    unitPrice: 250000,
    promotionPrice: 250000,
    image: '544bc48782741.png',
    unit: 'cái',
    section: 'catalog',
    displayOrder: 5
  },
  {
    legacyId: 12,
    name: 'Bánh sinh nhật rau câu trái cây',
    category: 'Bánh trái cây',
    description: 'Bánh rau câu mát lạnh với nhiều loại trái cây.',
    unitPrice: 200000,
    promotionPrice: 180000,
    image: '210215-banh-sinh-nhat-rau-cau-body- (6).jpg',
    unit: 'cái',
    section: 'catalog',
    displayOrder: 6
  },
  {
    legacyId: 13,
    name: 'Bánh kem Chocolate Dâu',
    category: 'Bánh kem',
    description: 'Bánh kem chocolate kết hợp dâu tươi.',
    unitPrice: 300000,
    promotionPrice: 280000,
    image: 'banh kem sinh nhat.jpg',
    unit: 'cái',
    section: 'catalog',
    displayOrder: 7
  },
  {
    legacyId: 14,
    name: 'Bánh kem Dâu',
    category: 'Bánh kem',
    description: 'Bánh kem dâu ngọt thanh, trang trí đẹp mắt.',
    unitPrice: 300000,
    promotionPrice: 280000,
    image: 'Banh-kem (6).jpg',
    unit: 'cái',
    section: 'catalog',
    displayOrder: 8
  },
  {
    legacyId: 16,
    name: 'Bánh trái cây',
    category: 'Bánh trái cây',
    description: 'Bánh trái cây mềm thơm, nhiều màu sắc tự nhiên.',
    unitPrice: 150000,
    promotionPrice: 120000,
    image: 'banhtraicay.jpg',
    unit: 'hộp',
    section: 'catalog',
    displayOrder: 9
  },
  {
    legacyId: 17,
    name: 'Apple Cake',
    category: 'Bánh trái cây',
    description: 'Bánh táo thơm mềm dùng kèm trà hoặc coffee.',
    unitPrice: 250000,
    promotionPrice: 240000,
    image: 'Fruit-Cake_7979.jpg',
    unit: 'cái',
    section: 'catalog',
    displayOrder: 10
  },
  {
    legacyId: 42,
    name: 'Beefy Pizza',
    category: 'Bánh Pizza',
    description: 'Thịt bò xay, ngô, sốt BBQ và phô mai mozzarella.',
    unitPrice: 150000,
    promotionPrice: 130000,
    image: '40819_food_pizza.jpg',
    unit: 'cái',
    section: 'catalog',
    displayOrder: 11
  },
  {
    legacyId: 49,
    name: 'Bánh su kem nhân dừa',
    category: 'Bánh su kem',
    description: 'Su kem nhân dừa béo thơm, vỏ bánh nhẹ xốp.',
    unitPrice: 120000,
    promotionPrice: 100000,
    image: 'maxresdefault.jpg',
    unit: 'cái',
    section: 'catalog',
    displayOrder: 12
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);
    await mongoose.disconnect();
  })
  .catch((error) => {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  });
