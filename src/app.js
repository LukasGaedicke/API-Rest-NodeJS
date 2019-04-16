'use strict'


const express = require('express');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');
const config = require('./config');


//atribuindo na const app o framework express
const app = express();

//instanciando as rotas do express
const router = express.Router();

const mongoose = require('mongoose');
//passa o ip/link do mongoBD
mongoose.connect(config.connString);

const Product = require('./models/products');
const Customer = require('./models/customer');
const Order = require('./models/order');

//setando o bodyParser
app.use(bodyParser.json());
//para codificar a url
app.use(bodyParser.urlencoded({extended: false}));


// setar as rotas da ./routes/index
//rotas definidas acima nas consts
app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);


module.exports = app;
