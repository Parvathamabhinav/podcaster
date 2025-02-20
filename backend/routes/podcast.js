const authMiddleware = require("../middleware/authMiddleware");
const upload= require("../middleware/multer");
const router =require("express").Router();
const Category = require("../models/category");
const Podcast = require("../models/podcast");
const User = require("../models/user");
//add-podcast
router.post("/add-podcast",authMiddleware,upload,async(req, res)=>{
    try{
        const {title,description,category}=req.body;
    const frontImage = req.files["frontImage"][0].path;
    const audioFile=req.files["audioFile"][0].path;

    if(!title || !description || !category || !frontImage || !audioFile){
        return res.status(404).json({message:"ALl fields are required"});
    }


    const {user} =req;
    const cat= await Category.findOne({categoryName:category});
    if(!cat){
        return res.status(400).json({message:"No category found"});
    }
    const catid=cat._id;
    const userid=user._id;
    const newPodcast=new Podcast({
        title,
        description,
        frontImage,
        audioFile,
        category:catid,
        user:userid
    });

    await newPodcast.save();
    await Category.findByIdAndUpdate(catid,{
        $push:{podcasts:newPodcast._id },
    })

    await User.findByIdAndUpdate(userid,{$push:{podcasts:newPodcast._id}});
    res.status(200).json({message:"Podcast saved successfully"})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to add podcast "})
    }
    
})

//get-podcasts
router.get("/get-podcasts",async(req,res)=>{
    try{
        const podcasts=await Podcast.find().populate("category").sort({createdAt:-1});

        return res.status(200).json({data:podcasts})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to get podcasts"})
    }
})

//get-user-podcasts
router.get("/get-user-podcasts",authMiddleware,async(req,res)=>{
    try{
        const {user}=req;
        const userid=user._id;
        const data= await User.findById(userid).
        populate({
            path:"podcasts",
            populate:{path:"category"},
        })
        .select("-password");
        if(data && data.podcasts){
            data.podcasts.sort(
                (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
            );
        }

        return res.status(200).json({data:data.podcasts})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to get podcasts"})
    }
})

//get podcast by id
router.get("/get-podcast/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const podcasts=await Podcast.findById(id).populate("category");
        return res.status(200).json({data:podcasts});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to get podcasts"})
    }
})

//get podcast by categories
router.get("/get-podcast/:cat",async(req,res)=>{
    try{
        const {cat}= req.params;
        const categories=await Category.find({categoryName:cat}).populate({
            path:"podcasts",
            populate:{path:"category"},
        });
        let podcasts=[];
        categories.forEach((category)=>{
            podcasts=[...podcasts,...category.podcasts]
        });
        return res.status(200).json({data:podcasts});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to get podcasts"})
    }
})

module.exports=router;