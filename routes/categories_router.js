const router = require('express').Router();
const auth_manager = require('../middlewares/auth_manager');

const {
    getAll,
    addCategory,
    updateCategory,
    deleteCategory,
    getById,
} = require('../controllers/categories_controller');

router.get('/all', auth_manager, getAll);
router.get('/get_by_id/:category_id', auth_manager, getById);
router.post('/add', auth_manager, addCategory);
router.put('/update/:category_id', auth_manager, updateCategory);
router.delete('/delete/:category_id', auth_manager, deleteCategory);

module.exports = router;