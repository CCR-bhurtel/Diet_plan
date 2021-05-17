const express = require('express');
const morgan = require('morgan');
const path = require('path');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

const GlobalErrorHandler = require('./Controllers/errorController');

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./Routes/authRoute'));
app.use('/api/users', require('./Routes/usersRoute').usersRoute);
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.use(morgan('dev'));
}

app.use(GlobalErrorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});
module.exports = app;
