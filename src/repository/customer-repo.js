'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.create = async(data) =>{
  var customer = new Customer(data);
  // TRATAR A PERSISTENCIA product.title =  req.body.title;
  //save no bd
  await customer.save();
}

exports.get = async() => {
  var res = await  Customer.find({});
  return res;
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}
