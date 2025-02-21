const jwt=require('jsonwebtoken');
const User=require("../models/user");

const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.podcasterUserToken;
    try{
        if(token){
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const user=await User.findById(decoded.id);
            if(user){
                req.user=user;
                next();
            }else{
                return res.status(404).json({message:'User not found'});
            }
        }

    }catch(error){
        console.error(error);
        return res.status(401).json({message:'Token is not valid'});
    }
}

module.exports=authMiddleware;