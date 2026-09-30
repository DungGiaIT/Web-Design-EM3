const squareModel = require('../models/square');

exports.showForm = (req, res) => {
  res.render('index', { perimeter: null, area: null });
};

exports.calculateSquare = async (req, res) => {
  const { sideLength } = req.body;
  const perimeter = 4 * sideLength;
  const area = sideLength * sideLength;

  try {
    await squareModel.saveSquareData(sideLength, perimeter, area);
    res.render('index', { perimeter, area });
  } catch (error) {
    console.error('Error saving to database', error);
    res.status(500).send('Server Error');
  }
};
