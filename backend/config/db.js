// MongoDB connection setup
require('dotenv').config();
const mongoose = require('mongoose');

const connection = ()=>{
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDb connected Successfully!');
}

module.exports = connection;