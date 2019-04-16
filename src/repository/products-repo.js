'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');


exports.get = async()=> {
  //Product.find({tags : 'pc'}) -- Algo expecifico
  const res = await Product.find(
      {active: true},
      'title price slug');
  return res
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
    slug : slug, active : true}, 'title description price slug tags');
    return res;
}

exports.getById = async(id) => {
    const res = await  Product.findById(id);
    return res;
}

exports.getByTags = async(tags) => {
    const res = await Product.find({
    tags : tags, active : true}, 'title description price');

    return res;
}

exports.create = async(data) =>{
  var product = new Product(data);
  // TRATAR A PERSISTENCIA product.title =  req.body.title;
  //save no bd
  await product.save();
}

exports.editProduct = async(id, title,description , price ) => {
  await Product.findByIdAndUpdate(id, {$set: {
      title: title,
      description:description,
      price: price
  }});
}

exports.delete = async(id) =>{
  await Product.findOneAndRemove(id);
}
