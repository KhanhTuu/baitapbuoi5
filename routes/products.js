var express = require('express');
var router = express.Router();
let productModel = require('../schemas/product');

function buildQuery(obj){
  console.log(obj);
  let result = {};
  if(obj.name){
    result.name = new RegExp(obj.name, 'i');
  }
  result.price = {};
  if(obj.price){
    result.price.$gte = obj.price.$gte ? obj.price.$gte : 0;
    result.price.$lte = obj.price.$lte ? obj.price.$lte : 10000;
  }
  return result;
}

// Lấy danh sách sản phẩm
router.get('/', async function(req, res) {
  try {
    let products = await productModel.find(buildQuery(req.query));
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Lấy sản phẩm theo ID
router.get('/:id', async function(req, res) {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) throw new Error('Không có ID phù hợp');
    res.status(200).send({ success: true, data: product });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
});

// Thêm sản phẩm mới
router.post('/', async function(req, res) {
  try {
    let newProduct = new productModel({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category
    });
    await newProduct.save();
    res.status(200).send({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Cập nhật sản phẩm (PUT)
router.put('/:id', async function(req, res) {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) throw new Error('Không tìm thấy sản phẩm');
    res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Xóa mềm sản phẩm (DELETE)
router.delete('/:id', async function(req, res) {
  try {
    let deletedProduct = await productModel.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!deletedProduct) throw new Error('Không tìm thấy sản phẩm');
    res.status(200).send({ success: true, data: deletedProduct });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
