'use strinct';

const mongoose = require('mongoose');
const Product = require('../models/products')
const ValidationContract = require('../validator/fluent-validator');
const repository = require('../repository/products-repo');

//buscando todos os produtos
exports.get = (req, res, next) => {
  //Product.find({tags : 'pc'}) -- Algo expecifico
  repository.get().then(data=> {
    res.status(200).send(data);
  }).catch(e => { // error
    res.status(400).send(e);
  });
};

exports.getByTags = (req, res, next) => {
  repository.getByTags(req.params.tags)
   .then(data=> {
    res.status(200).send(data);
  }).catch(e => { // error
    res.status(400).send(e);
  });
};

exports.getById = (req, res, next) => {
  repository.getById(req.params.id).
   then(data=> {
    res.status(200).send(data);
  }).catch(e => { // error
    res.status(400).send(e);
  });
};

exports.getBySlug = (req, res, next) => {
  repository.getBySlug(req.params.slug).
    then(data=> {
    res.status(200).send(data);
  }).catch(e => { // error
    res.status(400).send(e);
  });
};


exports.post = (req, res, next) => {
//validações
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');
  // Se os dados forem inválidos
      if (!contract.isValid()) {
          res.status(400).send(contract.errors()).end();
          return;
      }

repository.create(req.body)
    .then(x=> {
      res.status(201).send({message: 'Cadastrado com sucesso.'});
    }).catch(e => {
      res.status(400).send({message: 'Falha ao cadastrar.', data: e});
    });
};

exports.put = (req, res, next) => {
  repository.editProduct(req.params.id,req.body.title,req.body.description,req.body.price)
   .then(data=> {
    res.status(200).send({message: 'Produto att com sucesso!'});
  }).catch(e => { // error
    res.status(400).send({message: 'Erro ao att o produto. =/', data: e});
  });
};

exports.delete = (req, res, next) => {
repository.delete(req.params.id)
   .then(data=> {
    res.status(200).send({message: 'Produto removido com sucesso!'});
  }).catch(e => { // error
    res.status(400).send({message: 'Erro ao remover o produto. =/', data: e});
  });
};
