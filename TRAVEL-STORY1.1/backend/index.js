require("dotenv").config();


const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const upload = require("./multer");
const fs =  require("fs");

const path = require("path");


const { authenticateToken } = require("./util");


const User = require("./models/user");
const TravelStory = require("./models/travel-story");
const travelStory = require("./models/travel-story");








mongoose.connect(config.connectString); 


const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

//create account
app.post("/create-account",async (req,res) =>{
    const {fullName,email,password} = req.body;

    if(!fullName || !email || !password){
        return res
        .status(400)
        .json({error:true , message:"all fields are required"});
        
    }
    const isUser = await User.findOne({email});
    if(isUser){
        return res
        .status(400)
        .json({error:true , message:"User already exist"})
    };

    const hashPassword = await bcrypt.hash(password,10);
    const user = new User({
        fullName,
        email,
        password:hashPassword
    });
    await user.save();

    const accessToken = jwt.sign(
        {userId : user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '72h'}
    )

    return res.status(200).json({
        error:false,
        user:{fullName:user.fullName ,email:user.email },
        accessToken,
        message:'registiration succesful'
    });

    
});

//Login
app.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"email and password are required"});
    }
    
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message : "User not found"});

    }

    const isPasswordValid = await bcrypt.compare(password,user.password,);

    if(!isPasswordValid){
        return res.status(404).json({message : "password incorrect"})
    }

    const accessToken = jwt.sign(
        {userId : user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : '72h'}
    );

    return res.json({
        error : false,
        message : 'login succesful',
        user : {fullName:user.fullName , email : user.email},
        accessToken
    });
});


//get user
app.get("/get-user",authenticateToken, async (req,res) =>{
    const {userId}  = req.user
    const isUser  = await User.findOne({_id : userId});

    if(!isUser){
        return  res.sendStatus(400)
    } 

    return res.json({
        user : isUser,
        message : ""
    });
});


//add travel story
app.post("/add-travel-story",authenticateToken,async(req,res)=>{
    const {title,story,visitedLocation,imageUrl,visitedDate} = req.body
    const {userId} = req.user;

    if(!title || !story || !visitedDate || !visitedLocation || !imageUrl){
        return res.status(400).json({error:true,message:"all fields are required"})
    }

    const parseVisitedDate = new Date(parseInt(visitedDate));

    try{
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate:parseVisitedDate,
        });

        await travelStory.save();

        res.status(200).json({story:travelStory , message:'added succesfully'});
    }catch(error){
        res.status(400).json({error:true,message:error.message});
    }
});

app.get("/get-nf-all-stories",authenticateToken,async(req,res)=>{

    const {userId} = req.user;
    try{
       
        const travelStories = await TravelStory.find({locked:false
            
        }).sort({
            createdOn: -1 
        });

        res.status(200).json({stories:travelStories});


    }catch(err){

        console.log(err)
    }


})

//Get all stories
app.get("/get-all-stories",authenticateToken,async(req,res)=>{
    const {userId} = req.user;

    try{
        const travelStories = await TravelStory.find({userId:userId}).sort({
            isFavorite:-1
        });

        res.status(200).json({stories:travelStories});

    }catch(error){
        res.status(500).json({error:true,message:error.message});
    }
});

//Route to handle image
app.post("/image-upload", upload.single("image") , async(req,res)=>{
    try{
        if(!req.file){
            return res
            .status(400)
            .json({error:true , message:"No image Uploaded"});
        }
        const imageUrl = `http://localhost:8000/uploads/${req.file.filename} `;
        res.status(200).json({imageUrl});
    }catch(error){
        res.status(500).json({error:true,message:error.message});
    }
})

app.get("/get-one-story/:id",authenticateToken,async(req,res)=>{
    const{id} = req.params;
    const {userId} = req.user;

    try{

        const travelStory = await TravelStory.findOne({_id:id,userId:userId});
        
        res.status(200).json({story:travelStory });

    }

    catch(error){
        res.status(500).json({error:true,message:error.message});
        
    }

})

//delete image
app.delete("/delete-image",async(req,res)=>{
    const {imageUrl} = req.query;

    if(!imageUrl){
        return res
        .status(400)
        .json({error:true , message:"imageURL paramter is required"})
    }
    try{
        //extract the filename from the imageurl
        const filename = path.basename(imageUrl);
        
        //define the file path
        const filePath = path.join(__dirname,'uploads',filename);

        //check the file is exist
        if(fs.existsSync(filePath)){
            
            fs.unlinkSync(filePath);//delete code
            res.status(200).json({message:"file deleted"});

        }
        else{
            res.status(200).json({error:true,message:"image not found"})
        }
    }catch(error){
        res.status(500).json({error:true,message:error.message})
    }
})

//editstory
app.put("/edit-story/:id",authenticateToken,async(req,res)=>{
    const {id} = req.params;
    const{title,story,visitedLocation,imageUrl,visitedDate} = req.body;
    const{userId} = req.user;

    if( !title || !story || !visitedLocation  || !visitedDate){
        return res
        .status(400)
        .json({error:true,message:"all fields are required"})
    }

    const parseVisitedDate = new Date(parseInt(visitedDate));

    try{
        const travelStory = await TravelStory.findOne({_id: id ,userId:userId });

        if(!travelStory){
            return res.status(400).json({error:true,message:"travelstory not found"})
        }
        const placeholderImageUrl = `http://localhost:8000/assets/foto1.png`;

        travelStory.title = title;
        travelStory.story = story;
        travelStory.visitedLocation = visitedLocation;
        travelStory.imageUrl = imageUrl || placeholderImageUrl;
        travelStory.visitedDate = parseVisitedDate;

        await travelStory.save();
        res.status(200).json({message:"file has been updated"});
    }catch(error){
        res.status(400).json({error:true,message:error.message});
    };


    
})

//delete story
app.delete("/delete-story/:id",authenticateToken,async(req,res)=>{
    const {id} = req.params;
    const {userId} = req.user;
    try{
        const travelstory = await TravelStory.findOne({_id:id,userId:userId});
    if(!travelstory){
        return res.status(400)
        .json({error:true ,message:"travel story not found"})
    }

    await travelstory.deleteOne({_id:id , userId:userId});

    const imageUrl = travelstory.imageUrl;
    const filename = path.basename(imageUrl);
    const filePath = path.join(__dirname,'uploads',filename);

    fs.unlink(filePath,(err)=>{
        if(err){
            console.log("failed to delete image",err)
        }
    });

    res.status(200).json({message:"travelstory has been deleted"});
    }catch(error){
        return res.status(400).json({error:true,message:error.message})
    }


})


//Update isFavorite
app.put("/update-is-favorite/:id",authenticateToken,async(req,res)=>{
    const {id} = req.params;
    const {isFavorite} = req.body;
    const {userId} = req.user;

    try{
        const travelStory = await TravelStory.findOne({_id:id,userId:userId});
        
        if(!travelStory){
            return res.status(400).json({error:true , message:"Travel story not found"})
        };
        travelStory.isFavorite = isFavorite ;

        await travelStory.save();
        res.status(200).json({story:travelStory , message:"Update successful"});
    }catch(error){
        return res.status(400).json({story:travelStory , message:error.message});
    }




})

app.get("/searchnf" , authenticateToken,async(req,res)=>{
    const {query} = req.query;

    if(!query){
        return res.status(400).json({error:"query is rquired"});

    }
    try{
        const searchResults = await TravelStory.find({
            $or:[
                {title:{$regex:query , $options:"i"}},
                {story :{$regex:query , $options:"i"}},
                {visitedLocation:{$regex:query , $options:"i"}}
            ]

        }).sort({
            createdOn: -1 
        })
        res.status(200).json({stories:searchResults});
    }catch(error){
        console.log(error);
    }
})

app.get("/search",authenticateToken,async(req,res)=>{
    const {query} = req.query;
    const {userId} = req.user;
    
    if(!query){
        return res.status(400).json({error:true,message:"query is required"});

    }

    try{
        const searchResults = await TravelStory.find({
            userId:userId,
            $or:[
                {title:{$regex:query , $options:"i"}},
                {story :{$regex:query , $options:"i"}},
                {visitedLocation:{$regex:query , $options:"i"}}
            ]

        }).sort({isFavorite:-1});
        res.status(200).json({stories:searchResults});

    }catch(error){
        res.status(400).json({error:true , message:error.message});

    }
})

app.get("/travel-stories/filter",authenticateToken,async(req,res)=>{
    const {startDate,endDate} = req.query;
    const{userId} = req.user;

    try{
        const start = new Date(parseInt(startDate));
        const end = new Date(parseInt(endDate));

        const filteredStories = await TravelStory.find({
            userId:userId,
            visitedDate :{$gte:start,$lte:end},        
        }).sort({isFavorite:-1});//incele
        res.status(200).json({stories:filteredStories});


    }catch(error){
        return res.status(400).json({error:true,message:error.message});
    }
})


//serve statick files from the uplds
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/assets",express.static(path.join(__dirname,"assets")));





app.listen(8000);
module.exports = app;
