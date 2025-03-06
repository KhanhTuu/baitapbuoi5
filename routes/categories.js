var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category');

// Lấy danh sách danh mục
router.get('/', async (req, res) => {
  try {
    let categories = await categoryModel.find();
    res.status(200).send({ success: true, data: categories });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Thêm danh mục mới
router.post('/', async (req, res) => {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
      description: req.body.description
    });
    await newCategory.save();
    res.status(200).send({ success: true, data: newCategory });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Cập nhật danh mục
router.put('/:id', async (req, res) => {
  try {
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) throw new Error('Không tìm thấy danh mục');
    res.status(200).send({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Xóa danh mục
router.delete('/:id', async (req, res) => {
  try {
    let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) throw new Error('Không tìm thấy danh mục');
    res.status(200).send({ success: true, message: 'Danh mục đã được xóa' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
