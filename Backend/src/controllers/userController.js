const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 
const z = require('zod')
const User = require('../models/User')
const { fa } = require('zod/v4/locales')
require('dotenv').config()


const registerSchema = z.object({
    name : z.string().min(5).max(12),
    email:z.string().lowercase().email().trim(),
    password : z.string().min(6)
})

const registerUser =async (req , res)=>{
    const result = registerSchema.safeParse(req.body)
    //checking using zod condition
    if(!result){
        return res.status(400).json({
            sucess:false,
            message:"Incorrect format of credentials",
            errors : result.error.errors
        })
    }

    const {name , email , password}  = result.data;

    const existing_user = await User.findOne({email})

    if(existing_user){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
    }

    //everything is fine then hash Password

    const hashed_password = await bcrypt.hash(password , 10)

    const user = await User.create({
        name : name,
        email:email,
        password :hashed_password
    })

    return res.status(201).json({
        success:true,
        message:"Registration successful!"
    })
}

const loginSchema = z.object({
    email: z.string().email().lowercase().trim(),
    password:z.string().min(6)
})

const loginUser = async (req , res)=>{
    const result = await loginUser.safeParse(req.body);
    if(!result){
        return res.status(400).json({
            success:false,
            message:"Incorrect Credentials",
            error : result.error.errors
        })
    }
    
    const {email , password} = result.data

    const existing_user = await User.findOne({email})

    if(!existing_user){
        return res.status(400).json({
            success:false,
            message:"Incorrect email"
        })
    }

    if(existing_user.account !== 'active'){
        return res.status(403).json({
            success:false,
            message:"Active not Active"
        })
    }

    const pass_match = await bcrypt.compare(password , existing_user.password)
    if(!pass_match){
        return res.status(403).json({
            success:false,
            message:"Invlaid credentials"
        })
    }

    const token = await jwt.sign(
        {userId:existing_user._id , role:existing_user.role},
        process.env.JWT_SECR3T,
        {expiresIn:'7d'}
    )

    return res.status(200).json({
        success:true,
        token:token
    })
}