const express = require('express');
const authProtect = require('../MiddleWares/authProtect');
const Item = require('../Model/Item');
const catchAsync = require('../Utils/catchAsync');
const router = express.Router();

router.get(
  '/',
  authProtect,
  catchAsync(async (req, res, next) => {
    const items = await Item.find({ userId: req.user._id });
    res.status(200).json({
      items,
    });
    next();
  })
);

router.put('/', async (req, res, next) => {
  console.log('Deleter request came');
  console.log(req.body.itemId);
  try {
    const item = await Item.findOneAndDelete({
      itemId: req.body.itemId,
    });
  } catch (err) {
    console.log(err);
  }
  next();
});

router.post(
  '/',
  authProtect,
  catchAsync(async (req, res, next) => {
    console.log('Post request came', req.body);
    const item = await Item.create({
      userId: req.user._id,
      itemId: req.body.itemId,
      item: req.body.item,
    });
    res.status(204).json({
      item,
    });
    next();
  })
);

module.exports = router;
