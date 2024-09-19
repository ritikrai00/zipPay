const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect("mongodb+srv://itsritik:FwPUIbyc5mXzcsxs@cluster0.rdjeomr.mongodb.net/zipPay");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:20
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
})

const bankSchema=mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const User=mongoose.model("User",userSchema)
const Account=mongoose.model("Account",bankSchema)

module.exports={
    User,
    Account
}