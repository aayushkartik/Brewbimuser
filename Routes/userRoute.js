const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../Models/userModel.js')
const router = new express.Router();

router.post('/user/register', async (req, res)=>{
    const{name,email,password}= req.body;

    if(!name || !email || !password){
        return res.status(402).json({message:"please correctly fill the data"});
    }
    try{
        const existUser = await User.findOne({email: req.body.email});
        if(existUser){
            return res.status(402).json({message:"user already existed"})
        }
        const newUser = new User({
            name:name,
            email:email,
            remainingChecks:30, // free checks provided initially
            password:bcrypt.hashSync(password,12),
        });
        await newUser.save();
        res.status(200).json({message:"user registered successfully"});
    }catch(err){
        console.log(err);
    }
});

router.post("/user/login", async(req, res) => {
    const{email, password} = req.body;
    if(!email || !password){
        return res.status(402).json({message:"please correctly fill the data"});
    }
    try{
        const founduser = await User.findOne({ email: email});
        if(founduser){
            const isMatch = await bcrypt.compareSync(password, founduser.password);
            const token = await founduser.generateAuthToken();
            res.cookie('Brewbim', token,{
                httpOnly: true
            });
            if(isMatch){
                res.status(200).json({message:"user logged in successfully"});
            }
            else{   
                res.status(403).json({error:"Invalid credentials"});
            }
        }
    }catch(err) {
        console.log(err);
    }
});
module.exports =router;