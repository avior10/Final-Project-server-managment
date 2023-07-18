var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

const users_router = require('./routes/users_router');
const products_router = require('./routes/products_router');
const carts_router = require('./routes/carts_router');
const orders_router = require('./routes/orders_router');
const managers_router = require('./routes/managers_router');
const categories_router = require('./routes/categories_router');
const blog_router = require('./routes/blog_router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/managment/users', users_router);
app.use('/managment/products', products_router);
app.use('/managment/carts', carts_router);
app.use('/managment/orders', orders_router);
app.use('/managment/managers', managers_router);
app.use('/managment/categories', categories_router);
app.use('/managment/blog', blog_router);

module.exports = app;
