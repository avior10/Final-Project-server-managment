const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {

    getAllUsers: async (req, res) => {
        console.log("API request: get all users for manager");

        try {
            const users = await User.find().populate([
                "user_cart",
                "user_orders.order",
            ]).exec();

            return res.status(200).json({
                success: true,
                message: `success to find all users`,
                users
            });
        } catch (error) {
            return res.status(500).json({
                message: `error in get all users`,
                error: error.message,
            });

        }
    },

    addUser: async (req, res) => {
            try {
              // gettind values from the body request
              const { 
                user_name, 
                user_email, 
                user_password,
                user_password_confirm, 
                user_phone, 
                user_address } = req.body;
        
              const hash = await bcrypt.hash(user_password, 12);


              // creating new model using the values from req.body
              const new_user = new User({
                user_name,
                user_email,
                user_password: hash,
                user_phone,
                user_address,
              });
        
              // actual saving
              await new_user.save();
        
              // return success message
              return res.status(200).json({
                success: true,
                message: `success to add new user`,
              });
            } catch (error) {
              return res.status(500).json({
                message: `error in add new user`,
                error: error.message,
              });
            }
          
    },

    getUserById: async (req, res) => {
        try {
            const user_id = req.params.user_id;

            const user = await User.findById(user_id);

            return res.status(200).json({
                success: true,
                message: "success to get user by id",
                user
            });
        } catch (error) {
            return res.status(500).json({
                message: "error to get user by id",
                error: error.message
            });
        }
    },

    removeUser: async (req, res) => {
        try {
          const user_id = req.params.user_id;
    
          await User.findByIdAndDelete(user_id).exec();
    
          return res.status(200).json({
            success: true,
            message: `success to delete user by id`,
          });
        } catch (error) {
          return res.status(500).json({
            message: `error in delete user by id`,
            error: error.message,
          });
        }
      },

      updateUser: async (req, res) => {
        try {
          const id = req.params.user_id;

          await User.findByIdAndUpdate(id, req.body).exec();

          return res.status(200).json({
            success: true,
            message: "success to update user by id"
          });
        } catch (error) {
          return res.status(500).json({
            message: "error to update user by id",
            error: error.message
          });
        }
      }
}

