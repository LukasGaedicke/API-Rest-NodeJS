'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
  return Product.find({active: true}, 'title price slug');
}

exports.getBySlug = (slug) => {
  return Product.findOne({
    slug : slug, active : true}, 'title description price slug tags');
}

exports.getById = (id) => {
  return Product.findById(id);
}

exports.getByTags = (tags) => {
    return Product.find({
    tags : tags, active : true}, 'title description price');
}

exports.create = (data) =>{
  var product = new Product(data);
  // TRATAR A PERSISTENCIA product.title =  req.body.title;
  //save no bd
  return product.save();
}

exports.editProduct = (id, title,description , price ) => {
  return Product.findByIdAndUpdate(id, {$set: {
      title: title,
      description:description,
      price: price
  }});

}

exports.delete = (id) =>{
  return Product.findOneAndRemove(id);
}
