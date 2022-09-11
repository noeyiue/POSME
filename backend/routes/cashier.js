const express = require('express');
const router = express.Router();
const { isLoggedIn }  = require('./auth');

router.use(isLoggedIn);

// import model
const Item = require('../models/item');


router.get('/:barcode', async (req, res) => {
  try {
    const { barcode } = req.params;

    const item = await Item.findOne({ barcode: barcode });

    let { _id, name, price, discount } = item;
    const { is_discount, discount_price, end_date } = discount;
    const now = new Date();

    if (is_discount && end_date >= now) {
      price -= discount_price;
    }

    res.status(200).json({
      id: _id.toString(),
      name: name,
      priceEach: price
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;