'use strict'

const express  = require('express');
const router  = express.Router();

//Rota para o /
//req = requisicao -- res = resposta -- next = proximo
// ManoDica: Sempre tratar as coisas no / (uma rota só) -- /create - /delete NÃO É RECOMENDADO
router.get('/', (req, res, next) => {
  //retornando um Json
  res.status(200).send({
    title: "NodeJS API",
    version: "0.0.1"
  });
});

module.exports = router;
