const mongoose = require("mongoose");
const {mongoCred} = require('./config/default.json');
module.exports.connection = async () =>{
    await mongoose.connect(mongoCred.mongoDBconnectionStr,{useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', ()=>{
        console.error.bind(console, 'MongoDB connection error:')
    });
    db.once("open", function () {
        console.log("Connected successfully");
    });
    return true;
}