const express = require('express');
const authProtect = require('../MiddleWares/authProtect');

const User = require('../Model/User');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');
const { createSendToken } = require('./users');

const router = express.Router();

// @route GET api/auth
// @desc get logged in user
// @access Public

router.get(
  '/',
  authProtect,
  catchAsync(async (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user,
      },
    });
  })
);

// @route POST api/auth
// @desc Login in user
// @access Public

router.post(
  '/',
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Please provide both email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      console.log('Error comes');
      return next(new AppError('Incorrect Email or Password', 401));
    }
    createSendToken(user, res, 200);
  })
);
module.exports = router;
