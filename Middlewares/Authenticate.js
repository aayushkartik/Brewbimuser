require('dotenv').config()
const jwt= require('jsonwebtoken');
const User= require('../Models/userModel.js');
const cookieParser = require('cookie-parser');
 
const Authenticate =async(req,res,next)=>{
    try{
        const verifyToken = jwt.verify(req.cookies.Brewbim ,process.env.TOKENKEY);
        User.find({_id:verifyToken._id,"Tokens.token":req.cookies.Engineerspoint}, (err, user) => {
            if(err){
                throw new Error('user not found');
            }
            else{
                req.founduser = user[0];
            }});
            next();
    }catch(err){
        res.status(404).send("unauthorised user");
        console.log(err);
    }
}
module.exports = Authenticate;