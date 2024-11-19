import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';//burdasın 
import { errorHandler } from "../utils/error.js";



export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const hashpassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashpassword});
    try {
        await newUser.save();
        res.status(201).json({message:'user created '});
                
    } catch (error) {
       next(error);
    }


};


export const signin = async(req,res,next) =>{
    const {email,password} = req.body;
    try{
        const validUser = await User.findOne({email:email});
        if(!validUser){
            return next(errorHandler(404,'user not found'));
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(401,'wrong password'));
        }
        const token  = jwt.sign({id:validUser._id} , process.env.JWT_SECRET);
        const {password:hashpassword,...rest} = validUser._doc;
        const expiryDate = new Date(Date.now() + 3800000);

        // const validUser = await User.findOne({email:email});
        // if(!validUser)return next(errorHandler(404,'UserNotFound'));
        // const validPassword = bcryptjs.compareSync(password,validUser.password);
        // if(!validPassword)return next(errorHandler(401,'wrong password'));
        // const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET);
        // const {password: hashpassword , ...rest} = validUser._doc;
        // const expiryDate = new Date(Date.now() + 3800000);


        res.cookie('accestoken',token,{httpOnly:true})
        .status(200) 
        .json(validUser);

    }catch(error){
        next(error);
    }
};

export const google = async(req,res,next) =>{
    try{

        const user = await User.findOne({email : req.body.email})
        if (user){
            const token = jwt.sign({id : user._id ,} , process.env.JWT_SECRET);
            const {password : hashpassword, ...rest} = user._doc;
            const expiryDate = new Date(Date.now()+390000);
            res.cookie('access_token',token,{httpOnly:true,
                expires : expiryDate
            })
        }
        else{
            const generetedPassword = Math.random().toString(36).slice(-8) + toString(36).slice(-8)
            const hashpassword = bcryptjs.hashSync(generetedPassword,10);
            const newUser = new User({
                username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email:req.body.email,
                password:hashpassword,
                profilePicture:req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({id : newUser._id} , process.env.JWT_SECRET );
            const {password:hashpassword2,...rest} = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000 );
            
            res.cookie('acces_token',token,{
                httpOnly : true,
                expires:expiryDate
            
            }).status(200).json(rest);
        
        }
        

    }catch(error){
        next(error)
    }
}