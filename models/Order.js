const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const order_schema = new Schema({


    user: {
            type:mongoose.Types.ObjectId,
            ref:'users',
            required:true
    },

    total_price: {
        type:Number,
        required:true,
        min:1
    },


    payment_details: {

        terminal_number :  {
            type:String,
            required:true,
            match:/^[0-9]+$/
        },

        transaction_number : {
            type:String,
            required:true,
            match:/^[0-9]+$/,
            unique:true
        },

        transaction_date: {
            type:Date,
            default:Date.now()
        },

        last_digits: {
            type:String,
            required:true,
            match:/^[0-9]+$/
        }

    },


     products: [

        {
            product: {
                type:mongoose.Types.ObjectId,
                ref:'products',
                required:true
            },
            quantity : {
                type:Number,
                required:true,
                min:1
            }
        }
    ]
 ,

/*     user_cart : {
        type:mongoose.Types.ObjectId,
        ref:'carts'
    } */

    status: {
		type: Number,
		default: 1,
		min: [1, "minimum is 1"],
		max: [4, "maximum is 4"],
	},

	created_at: {
		type: Date,
		default: function () {
			return Date.now();
		},
	},

	order_number: {
		type: Number,
		default: function () {
			return Date.now();
		},
	}
})

order_schema.pre("save", function(next) {
    this.total_price = this.products.reduce((total, product) => {
        const productPrice = product.product.price;
        const productQuantity = product.quantity;
        return total + (productPrice * productQuantity);
    }, 0);

    next();
});


module.exports = mongoose.model('orders', order_schema);