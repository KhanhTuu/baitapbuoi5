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
router.get('/', async (req, res) => {
    try {
        let products = await productModel.find(buildQuery(req.query));
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Lấy sản phẩm theo ID
router.get('/:id', async (req, res) => {
    try {
        let product = await productModel.findById(req.params.id);
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Không có ID phù hợp' });
    }
});

// Thêm sản phẩm mới
router.post('/', async (req, res) => {
    try {
        let newProduct = new productModel(req.body);
        await newProduct.save();
        res.json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cập nhật sản phẩm (PUT)
router.put('/:id', async (req, res) => {
    try {
        let updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Xóa mềm sản phẩm (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        let deletedProduct = await productModel.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
        res.json({ success: true, data: deletedProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;