import  User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../lib/utils/generateToken.js";


export const signup = async(res,req) =>{

    try {
        const {fullName,username,email,password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid user format"});
        }

        const existingUser = await UserActivation.findOne({username});
        if(existingUser){
            return res.status(400).json({error:"Username is already taken"});

        }

        const existingEmail = await UserActivation.findOne({email});
        if(existingEmail){
            return res.status(400).json({error:"Email is already taken"});

        }

        if(existingEmail.length < 6){
            return res.status(400).json({error:"password must be atleast 6 characters long"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            username ,
            email ,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookies(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullNmae:newUser.username,
                email:newUser.email,
                fullName:newUser.fullName,
                profileImg:newUser.profileImg,
                coverImg:newUser.coverImg,
                
                followers:newUser.followers,
                following:newUser.following,
            })
        }
        else{
            return res.status(400).json({ error: 'some error' });

        }
    } catch (error) {
        console.log("Error is signup controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
       
};

export const login = async(res,req) =>{
    
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        generateTokenAndSetCookies(user._id,res);

        res.status(200).json({
            _id:userser._id,
                username:user.username,
                email:user.email,
                fullName:user.fullName,
                profileImg:user.profileImg,
                coverImg:user.coverImg,
                
                followers:user.followers,
                following:user.following,
        });
        
    } catch (error) {
        console.log("Error is login controller",error.message);
    res.status(500).json({error:"Internal server error"});
        
    }
};

export const logout = async(res,req) =>{
    
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
    
   } catch (error) {
    console.log("Error is logout controller",error.message);
    res.status(500).json({error:"Internal server error"});
   }
};

export const getMe = async (req,res) =>{
    try {
       const user = await User.findById(req.user._id).select("-password");
       res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe  controller",error.message);
    res.status(500).json({error:"Internal server error"});
    }
};



