const express = require('express');
const User = require('../Model/User');
const catchAsync = require('../Utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../Utils/appError');
const Settings = require('../Model/Settings');

const router = express.Router();

// @route POST api/users
// @desc Register User
// @access Public
const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, res, statusCode, newUser) => {
  const token = signInToken(user._id);

  console.log(newUser);
  if (newUser) {
    console.log('New user here');
    const setting = await Settings.create({ userId: user._id });
  }
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

router.post(
  '/',
  catchAsync(async (req, res, next) => {
    //   Return the json web token as a cookie
    const { email, name, password, passwordConfirm } = req.body;
    if (!email || !name || !password || !passwordConfirm)
      return next(new AppError('Please input all fields', 400));
    const user = await User.create(req.body);

    createSendToken(user, res, 201, true);
  })
);
exports.createSendToken = createSendToken;
exports.userRouter = router;
