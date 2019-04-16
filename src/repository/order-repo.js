'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.create = async(data) =>{
  var order = new Order(data);
  await order.save();
}

exports.get = async() => {
  //Personalizar o retorno. Mais informaçõões
  //https://www.youtube.com/watch?v=gsUBcOzemkc&list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn&index=29
  var res = await  Order.find({}).populate('customer').populate('items-product');
  return res;
}
