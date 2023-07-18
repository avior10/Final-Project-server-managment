const Category = require('../models/Category');

module.exports = {
    getAll: async (req, res) => {
        try {
            const categories = await Category.find().exec();

            return res.status(200).json({
                success: true,
                message: `success to find all categories - for managers`,
                categories,
            });
        } catch (error) {
            return res.status(500).json({
                message: `error in get all categories - for -managers`,
                error: error.message,
            });
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.category_id;
            const category = await Category.findById(id);

            return res.status(200).json({
                success: true,
                message: `success to finf category by id - for managers`,
                category
            });
        } catch (error) {
            return res.status(500).json({
                message: `error to get category by id - for managers`,
                error: error.message,
            });
        }
    },

    addCategory: async (req, res) => {
        try {
            const { category_name } = req.body;

            const category = new Category({
                category_name
            });

            await category.save();

            return res.status(200).json({
                success: true,
                message: `success to add new category - for managers`,
            });
        } catch (error) {
            return res.status(500).json({
                message: `error in add new category - for managers`,
                error: error.message,
            });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const id = req.params.category_id;
            const { category_name } = req.body;

            await Category.findByIdAndUpdate(id, { category_name });

            return res.status(200).json({
                success: true,
                message: `success to update category by id - for managers`,
            });
        } catch (error) {
            return res.status(500).json({
                message: `error in update category by id - for managers`,
                error: error.message,
            });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const id = req.params.category_id;

            await Category.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: `success to delete category by id - for managers`,
            });
        } catch (error) {
            return res.status(500).json({
                message: `error in delete category by id - for managers`,
                error: error.message,
            });
        }
    }
}