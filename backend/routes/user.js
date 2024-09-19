const express=require("express");
const {z}=require("zod")
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require("../config")
const {User, Account}=require("../db");
const { authMiddleware } = require("../middleware");

const router=express.Router();

const signupValid=z.object({
    username: z.string().email(),
    password: z.string().min(6),
    firstname: z.string().max(50),
    lastname: z.string().max(50)
})

const signinValid = z.object({
    username: z.string().email(),
	password: z.string()
})

const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

router.post("/signup",async (req,res)=>{
    const {username,password,firstname,lastname}=req.body;
    const userVal=signupValid.safeParse({username,password,firstname,lastname});
    if(!userVal.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    }
    const userExists=await User.findOne({username});
    if(userExists){
        res.status(411).json({
            message: "Email already taken"
        })
        return;
    }
    const user=await User.create({username,password,firstname,lastname})
    const userID=user._id;

    await Account.create({
        userID,
        balance: (1+ Math.random()*10000).toFixed(2)
    })

    const token=jwt.sign({userID},JWT_SECRET);
    res.status(200).json({
        message: "User created successfully",
        token
    })
})

router.post('/signin',async (req,res)=>{
    const {username, password}=req.body;
    const userVal = signinValid.safeParse({username, password})
    if (!userVal.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user=await User.findOne({username,password});
    if(!user){
        res.status(411).json({
            message: "Error while logging in"
        })
        return;
    }
    const userID=user._id;
    const token=jwt.sign({userID},JWT_SECRET);
    res.status(200).json({
        token
    })
})

router.put('/',authMiddleware,async (req,res)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
        return;
    }
    
    const updated=await User.updateOne({
        _id: req.userID
    },req.body)
    if(updated){
    res.status(200).json({
        message: "Updated successfully"
    })
    return;
}
    res.json({msg:"failed"})
})

router.get("/bulk",authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $and:[{ _id: { $ne: req.userID } },
        {$or: [
            {firstname: {
                "$regex": filter,
                "$options": "i"
            }},
            {lastname: {
                "$regex": filter,
                "$options": "i"
            }}
        ]}]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})

module.exports=router
