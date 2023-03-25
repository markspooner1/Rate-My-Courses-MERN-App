import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/user.js"

//Register user
//Calling mongoDB, thus needs to be async
//req = frontend, res = backend

export const register = async(req, res) =>{
    try{
        //destructing front end input with the following fields
        const {
            firstName,
            lastName,
            email,
            password,
            major,
            picturePath,
            friends,
            location,
            occupation
        } = req.body; 
        //use to encrypt pw
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            major,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
        });
        await newUser.save();
        const user = await User.findOne({email: email});
        //201 created status back to user with json version of saved user (sent to front-end)
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.status(201).json({token, user});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//Login 
export const login = async(req, res) =>{
    console.log("login 400?");
    try{
        //grab email and pw when user tries to login
        const {email, password} = req.body;
        //check mongoose if this email exists
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: "User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}