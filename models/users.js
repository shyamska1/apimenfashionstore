const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    Phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    CnfPassword:{
        type:String,
        required:true

    }
    
},{timestamps:true});
module.exports= mongoose.model('User',userSchema);