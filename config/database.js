const mongoose = require('mongoose');

const url = process.env.DATABASE || "mongodb://127.0.0.1:27017/final_project";

mongoose.set('strictQuery', true);


const connection = async()=>{

    try {
        
        await mongoose.connect(url);

        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
};


module.exports = connection;