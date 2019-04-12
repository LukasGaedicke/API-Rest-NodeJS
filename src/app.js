'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
//atribuindo na const app o framework express
const app = express();

//instanciando as rotas do express
const router = express.Router();
//setando o bodyParser
app.use(bodyParser.json());
//para codificar a url
app.use(bodyParser.urlencoded({extended: false}));

// setar as rotas da ./routes/index
app.use('/', indexRoute);
app.use('/products', productsRoute);


module.exports = app;
