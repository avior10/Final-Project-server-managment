const router = require('express').Router();
const auth_manager = require('../middlewares/auth_manager');
const auth_admin = require('../middlewares/auth_admin');
const { managerAddValidation } = require('../middlewares/validations');

const {
    addManager,
    deleteManager,
    updateManager,
    getAllManagers,
    getManagerById,
    loginManager,
    logoutManager,
    authManager,
    registerAdmin
} = require('../controllers/managers_controller');

//every manager is allowed
router.get('/all', auth_manager, getAllManagers); /* add auth manager */
router.get('/get_by_id/:manager_id', auth_manager, getManagerById); /* add auth manager */
router.post('/login', loginManager); /* add auth manager */
router.post('/logout', auth_manager, logoutManager); /* add auth manager middleware */
router.get('/auth', authManager);

//only admin is allowed 
router.post('/add_manager', auth_admin, managerAddValidation, addManager); /* add auth admin middleware */
router.delete('/delete_manager/:manager_id', auth_admin, deleteManager); /* add auth admin middleware */
router.put('/update_manager/:manager_id', auth_admin, updateManager); /* add auth admin middleware */
router.post('/register_admin', registerAdmin);

module.exports = router;
