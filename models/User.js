const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const user_schema = new Schema({


    user_name:{
        type:String,
        required: true,
        unique: true
    },

    user_email:{
        type:String,
        unique: true,
        lowercase: true,
        required: true
    },

    user_password:{
        type:String,
        required: true,
        trim: true
    },

    user_phone : {
        type:String,
        required: true
        // match:/^([0]\d{1,3}[-])?\d{7,10}$/
    },


    user_address : {
        type:String,
        unique: true,
        required: true
    },
    user_cart : {
        type:mongoose.Types.ObjectId,
        ref:'carts'
    },

    user_orders : [
        {
            order : {
                type:mongoose.Types.ObjectId,
                ref:'orders'
            }
        }
    ],
    user_posts : [
        {
            post : {
                type:mongoose.Types.ObjectId,
                ref:'Blog'
            }
        }
    ],

    tokens: [{ type: Object }]

})


// user_schema.pre('save', async function(next){

//     const hash = await bcrypt.hash(this.user_password, 15);
//     this.user_password = hash;
//     next();
// })


module.exports = mongoose.model('users', user_schema);