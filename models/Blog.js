const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blog_schema = new Schema({
    post_title: {
        type: String,
        required: true,
        trim: true
    },

    post_content: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
    },

    manager: {
        type: mongoose.Types.ObjectId,
        ref: 'managers',
    }

});

module.exports = mongoose.model('Blog', blog_schema);
