const express=require("express")
const {Account, User}=require("../db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const router=express.Router();

router.get('/balance',authMiddleware, async (req,res)=>{
    
    const account=await Account.findOne({
        userID: req.userID
    })
    const name=await User.findOne({
        _id: req.userID
    })
    res.status(200).json({
        name: name.firstname+" "+name.lastname,
        balance: account.balance
    })
})

router.post('/transfer',authMiddleware, async (req,res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const {to, amount}=req.body;
    if(amount<=0){
        return res.status(400).json({
            msg: "Input correct amount"
        })
    }
    const account=await Account.findOne({userID: req.userID}).session(session)
    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toaccount=await Account.findOne({userID: to}).session(session)
    if(!toaccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }
    

    await Account.updateOne({userID: req.userID}, {$inc:{balance: -amount}}).session(session)
    await Account.updateOne({userID: to}, {$inc:{balance: amount}}).session(session)
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
        msg:"Transfer successful"
    })
})

module.exports=router
