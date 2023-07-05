const router = require("express").Router();
const auth_manager = require('../middlewares/auth_manager');
const {userAddValidation} = require('../middlewares/validations')

const {
    addUser,
    removeUser,
    getAllUsers,
    getUserById,
    updateUser
} = require('../controllers/users_controller');

router.get('/all', auth_manager, getAllUsers); /* V */
router.get('/get_by_id/:user_id', auth_manager, getUserById); /* V */
router.post('/add', auth_manager, userAddValidation, addUser); /* V */
router.delete('/delete/:user_id', auth_manager, removeUser); /* V */
router.put('/update/:user_id', auth_manager, updateUser);

module.exports = router;