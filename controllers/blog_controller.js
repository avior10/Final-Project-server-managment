const Blog = require('../models/Blog');
const colors = require('colors');
const User = require('../models/User');
const Manager = require('../models/Manager');

module.exports = {

    getAllPosts: async (req, res) => {
        console.log("API request: get all posts".white);

        try {
            const posts = await Blog.find().populate('user');

            console.log("success to get all posts".green);

            return res.status(200).json({
                success: true,
                message: "success to get all posts",
                posts
            });

        } catch (err) {
            console.log("error to get all posts".red);

            return res.status(404).json({
                message: "error to get all posts",
                error: err.message
            });
        }
    },

    addPost: async (req, res) => {

        try {
            console.log("API request: add post".white);

            const {
                post_title,
                post_content,
                user,
                manager
            } = req.body;


            if (!post_title || !post_content) {
                throw new Error("fill all required fields");
            }

            if (!user) {
                const find_manager = Manager.findById(manager);

                if (find_manager) {
                    const new_post = new Blog({
                        post_title,
                        post_content,
                        manager
                    });
                    await new_post.save();

                    console.log("Dear manager, your post added successfully".green);

                    return res.status(200).json({
                        success: true,
                        message: "Dear manager, your post added successfully"
                    });
                }
            }

            if (!manager) {
                const find_user = User.findById(user);

                if (find_user) {
                    const new_post = new Blog({
                        post_title,
                        post_content,
                        user
                    });
                    await new_post.save();

                    console.log("post added successfully".green);

                    return res.status(200).json({
                        success: true,
                        message: "post added successfully"
                    });
                }
            }

            else {
                throw new Error("No user/manager found");
            }

        } catch (err) {
            console.log("error to add post".red);

            return res.status(404).json({
                message: "error to add post",
                error: err.message
            });
        }
    },

    removePost: async (req, res) => {
        try {
            console.log("API request: remove post".white);

            const post_id = req.params.post_id;
            const post = await Blog.findById(post_id);

            if (!post) {
                throw new Error("post not found");
            }

            await Blog.findByIdAndDelete(post_id);

            console.log("post deleted successfully".green);

            return res.status(200).json({
                success: true,
                message: "post deleted successfully"
            });

        } catch (err) {
            console.log("error to delete post".red);

            return res.status(404).json({
                message: "error to delete post",
                error: err.message
            });
        }
    },

    updatePost: async (req, res) => {
        try {
            console.log("API request: update post".white);

            const post_id = req.params.post_id;
            const post = await Blog.findById(post_id);

            if (!post) {
                throw new Error("post not found");
            }

            const manager_id = post.manager;

            const find_manager = await Manager.findById(manager_id);

            if(find_manager) {
                await Blog.findByIdAndUpdate(post_id, req.body);

                console.log("success to update post".green);

                return res.status(200).json({
                    success: true,
                    message: "success to update post"
                });
            }

            else {
                throw new Error("Dear manager, you allowed to update only your own posts");
            }

        } catch (err) {
            console.log("error to update post".red);

            return res.status(404).json({
                message: "error to update post",
                error: err.message
            });
        }
    }
}