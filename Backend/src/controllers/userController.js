const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 
const z = require('zod')
const User = require('../models/User')

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

    

}