'use strinct';

const mongoose = require('mongoose');
const guid = require('guid');

const Order = require('../models/order')
const ValidationContract = require('../validator/fluent-validator');
const orderCustomer = require('../repository/order-repo');


exports.post = async(req, res, next) => {
  let data = req.body;
  data.number = guid.raw().substring(0,6 );
  try {

    // obtendo as info do token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    await orderCustomer.create({
      customer: req.body.custumer,
      number: req.body.number,
      items: req.body.items
    });
    res.status(201).send({message : 'Ordem cadastrada com sucesso.'});
  }catch(e){
    res.status(500).send({
      message : 'Falha ao processar a requisição.'
    });
  }
};

exports.get = async(req, res, next) => {
  try {
    var data  = await orderCustomer.get();
    res.status(200).send(data);
  }catch(e){
    res.status(500).send({
      message : 'Falha ao processar a requisição.'
    });
  }
};
