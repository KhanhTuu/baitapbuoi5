var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category');

// Lấy danh sách danh mục
router.get('/', async (req, res) => {
    try {
        let categories = await categoryModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Tạo danh mục mới
router.post('/', async (req, res) => {
    try {
        let newCategory = new categoryModel(req.body);
        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cập nhật danh mục
router.put('/:id', async (req, res) => {
    try {
        let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Xóa danh mục
router.delete('/:id', async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;