const express=require("express");
const userRouter=require("./user")
const accountRouter=require('./account')

const router=express.Router();

router.use("/user",userRouter)

const router2=express.Router();
router2.use("/account",accountRouter)


module.exports={
    router,
    router2
}