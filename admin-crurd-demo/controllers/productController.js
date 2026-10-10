const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const sortOrder = req.query.sort === 'desc' ? 'DESC' : 'ASC';

    const { count, rows } = await Product.findAndCountAll({
      limit,
      offset,
      order: [['name', sortOrder]]
    });

    res.render('admin/index', {
      products: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      sortOrder: sortOrder.toLowerCase()
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Cách 2 với include Category và distinct

// exports.getAll = async (req, res) => {
//   try {
//     let page = parseInt(req.query.page, 10);
//     if (!page || page < 1) page = 1;

//     const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
//     const offset = (page - 1) * limit;
//     const sortOrder = req.query.sort === 'desc' ? 'DESC' : 'ASC';

//     const { count, rows } = await Product.findAndCountAll({
//       limit,
//       offset,
//       order: [['name', sortOrder]],
//       include: [Category],
//       distinct: true
//     });

//     res.render('admin/index', {
//       products: rows,
//       currentPage: page,
//       totalPages: Math.ceil(count / limit),
//       sortOrder
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };


exports.create = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : 'default.jpg';
    await Product.create({ name, price, image, description });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Create error');
  }
};

exports.editForm = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.render('admin/edit', { product });
};

exports.update = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updateData = { name, price, description };
    if (req.file) updateData.image = req.file.filename;
    await Product.update(updateData, { where: { id: req.params.id } });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Update error');
  }
};

exports.delete = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Delete error');
  }
};