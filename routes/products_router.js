const router = require("express").Router();
const uploadImage = require('../middlewares/uploadImage');
const auth_manager = require('../middlewares/auth_manager');

const {
    getAll,
    getById,
   addProduct,
    deleteProduct,
    updateProduct,
    getProductByCategory 
} = require('../controllers/products_controller');

router.get('/all',auth_manager, getAll); /* V */
router.get('/get_by_id/:product_id', auth_manager, getById); /* V */
router.get('/get_by_category/:category_id', auth_manager, getProductByCategory);
router.post('/add', auth_manager, uploadImage, addProduct); /* V */
router.delete('/delete/:product_id', auth_manager, deleteProduct); /* V */
router.put('/update/:product_id', auth_manager, uploadImage, updateProduct); /* V */

module.exports = router;