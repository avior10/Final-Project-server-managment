const router = require("express").Router();

const {
    getAllCarts,
    getById,
    updateById,
    deleteById,
    add
} = require('../controllers/carts_controller');

router.get('/all', getAllCarts); /* V */
router.get('/get_by_id/:cart_id', getById); /* V */
router.put('/update/:cart_id', updateById); /* V */
router.delete('/delete/:cart_id', deleteById); /* V */
router.post('/add', add); /* V */

module.exports = router;