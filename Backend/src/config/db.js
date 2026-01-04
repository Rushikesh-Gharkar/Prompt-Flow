const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected successfully to db');
    }
    catch(err){
        console.log(`Error while connecting to db ${err.message}`);
        process.exit(1)
    }
}

module.exports = connectDB();



