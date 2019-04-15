'use strict'


const express = require('express');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');

//atribuindo na const app o framework express
const app = express();

//instanciando as rotas do express
const router = express.Router();

const mongoose = require('mongoose');
//passa o ip/link do mongoBD
mongoose.connect('mongodb://127.0.0.1:27017');
const Product = require('./models/products');


//setando o bodyParser
app.use(bodyParser.json());
//para codificar a url
app.use(bodyParser.urlencoded({extended: false}));


// setar as rotas da ./routes/index
//rotas definidas acima nas consts
app.use('/', indexRoute);
app.use('/products', productsRoute);


module.exports = app;
