const router = require("express").Router();

const {
    getAllOrders,
    add,
    getById,
    updateById,
    deleteById,
    updateStatus
} = require('../controllers/orders_controller');

router.get('/all', getAllOrders);
router.get('/get_by_id/:user_id', getById);
router.post('/add', add);
router.delete('/delete/:product_id', deleteById);
router.put('/update/:user_id', updateById)
router.put('/update_status/:user_id', updateStatus);

module.exports = router;