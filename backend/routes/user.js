const router=require('express').Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const auth=require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
//signup routes
 router.post('/signup',async(req,res)=>{
  //code to handle signup logic
  try{
    const {username,email,password} = req.body;
    if(!username || !email|| !password)
        return res.status(400).json({error:'All fields are required'});
    if(username.length <5) {
        return res.status(400).json({error:'Username must be at least 5 characters long'});
    }
    if(password.length <6) return res.status(400).json({error:'Password must be at least'});
    
    //check if user already exists
    const existingEmail=await User.findOne({email:email});
    const existingusername=await User.findOne({username:username});

    if(existingEmail || existingusername){
        return res.status(400).json({message:'User already exists with this email or username'});
    }

    //hash the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser = new User({ username, email , password: hashedPassword})
    await newUser.save();
    return res.status(200).json({message:'User saved successfully'});




}catch(error){
    console.log(error);
    res.status(400).json({error});
  }
 });

//signin routes
router.post('/signin',async(req, res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
            return res.status(400).json({error:'All fields are required'});
        
        //check if user exists
        const existingUser=await User.findOne({email:email});
        if(!existingUser) return res.status(400).json({error:'User not found with this email'});

        //compare password
        const isMatch=await bcrypt.compare(password,existingUser.password);
        if(!isMatch) return res.status(400).json({error:'Invalid credentials'});


        //generate and send jwt token
        const token=jwt.sign({id:existingUser._id,email:existingUser.email},process.env.JWT_SECRET,{expiresIn:"30d"});

        res.cookie("podcasterUserToken",token,{
            httpOnly:true,
            maxAge:30*24*60*60*100, //30days
            secure:process.env.NODE_ENV==="production",
            sameSite:"None"

        });

        return res.status(200).json({
            id:existingUser._id,
            username:existingUser.username,
            email:email,
            message:"Sign in Successfully"
        });
    }catch(error){
        console.log(error);
        res.status(400).json({error});
    }
});


//logout
router.post('/logout',async(req, res) => {
    res.clearCookie("podcasterUserToken",{
        httpOnly: true,
       
    });
    res.json({message:"Logged out Successfully"})
})

//check cookie present or not present

router.post('/check-cookie',async(req,res)=>{
    const token = req.cookies.podcasterUserToken;
    if(token){
        res.status(200).json({message:true});
    }

    res.status(200).json({message:false});
})

//route to fetch user details

router.post('/user-details',authMiddleware,async(req,res)=>{
    try{
        const {email}=req.user;
        const existingUser=await User.findOne({email:email}).select("-password");
        return res.status(200).json({user:existingUser});
    }catch(error){
        console.log(error);
        res.status(500).json({error:error});
    }
})




module.exports=router;