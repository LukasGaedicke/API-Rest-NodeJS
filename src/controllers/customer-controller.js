'use strinct';
const mongoose = require('mongoose');
const Customer = require('../models/customer')
const ValidationContract = require('../validator/fluent-validator');
const repositoryCustomer = require('../repository/customer-repo');
const authService = require('../services/auth-service');




exports.authenticate = async(req, res, next) => {
  try {
    const customer = await repositoryCustomer.authenticate({
      email: req.body.email,
      password: req.body.password
    });

    if (!customer) {
      res.status(404).send({
        message: 'Usuário ou senha inválidos'
      });
      return;
    }

    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    });

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name
      }
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({
      message : 'Falha ao processar a requisição.'
    });
  }
};

exports.refreshToken = async(req, res, next) => {
  try {
    // obtendo as info do token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const customer = await repositoryCustomer.getById(data.id);

    if (!customer) {
      res.status(404).send({
        message: 'Cliente não encontrado.'
      });
      return;
    }

    const tokenAux = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    });

    res.status(201).send({
      token: tokenAux,
      data: {
        email: customer.email,
        name: customer.name
      }
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({
      message : 'Falha ao processar a requisição.'
    });
  }
};


exports.post = async(req, res, next) => {


  //validações
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, 'O título deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.email, 3, 'E-mail inválido');
  contract.hasMinLen(req.body.password, 3, 'Senha deve conter pelo menos 3 caracteres');
  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    var data  = await repositoryCustomer.create({
      name : req.body.name,
      email: req.body.email,
      password: req.body.password,
      roles: ['user']
    });
    res.status(201).send({message : 'Cliente cadastrado com sucesso.'});
  }catch(e){
    res.status(500).send({
      message : 'Falha ao processar a requisição.'
    });
  }
};

exports.get = async(req, res, next) => {
  try {
    var data  = await repositoryCustomer.get();
    res.status(200).send(data);
  }catch(e){
    res.status(500).send({
      message : 'Falha ao processar a requisição.'
    });
  }
};
