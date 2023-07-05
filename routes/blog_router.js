const router = require('express').Router();
const auth_manager = require('../middlewares/auth_manager');

const {
    getAllPosts,
    addPost,
    removePost,
    updatePost
} = require('../controllers/blog_controller');

router.get('/all', auth_manager, getAllPosts);
router.post('/add', auth_manager, addPost);
router.delete('/delete/:post_id', auth_manager, removePost);
router.put('/update/:post_id', auth_manager, updatePost);

module.exports = router;
