'use strinct';

const mongoose = require('mongoose');
const Product = require('../models/products')
const ValidationContract = require('../validator/fluent-validator');
const repository = require('../repository/products-repo');

//buscando todos os produtos
exports.get = async(req, res, next) => {
  try {
      var data  = await repository.get();
      res.status(200).send(data);
  }catch(e){
    res.status(500).send({
      message : 'Falha ao processar a requisição.'
    });
  }
};

exports.getByTags = async (req, res, next) => {
try {
      var data  = await repository.getByTags(req.params.tags);
      res.status(200).send(data);
  }catch(e){
    res.status(500).send({
      message : 'Falha ao processar a requisição.'
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
        var data  = await repository.getById(req.params.id);
        res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
};

exports.getBySlug = async(req, res, next) => {
  try {
        var data  = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
};


exports.post = async(req, res, next) => {
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

      try {
            var data  = await repository.create(req.body);
            res.status(200).send(data);
        }catch(e){
          res.status(500).send({
            message : 'Falha ao processar a requisição.'
          });
        }
};

exports.put =async (req, res, next) => {
  try {
        var data  = await repository.editProduct(req.params.id,req.body.title,req.body.description,req.body.price);
        res.status(200).send(data);
    }catch(e){
      res.status(500).send({
        message : 'Falha ao processar a requisição.'
      });
    }
};

exports.delete = async(req, res, next) => {
  try {
        var data  = await repository.delete(req.params.id);
        res.status(200).send(data);
    }catch(e){
      res.status(500).send({message : 'Falha ao processar a requisição.'});
    }
};
