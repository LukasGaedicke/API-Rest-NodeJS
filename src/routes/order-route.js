'use strict'

const express  = require('express');
const router  = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');


//verifica antes de entrar, se for um TOKEN válido, ele continua
router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);


module.exports = router;
