const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

const db = mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("database connected successfully");
    
})

.catch(()=>{
    console.log("database connection error");
    
})

module.exports = db;
