require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    remainingChecks:Number,
    Tokens:[{token:String}],
});
userSchema.methods.generateAuthToken = async function(){
    try{
        let token= jwt.sign({_id:this._id},process.env.TOKENKEY);
        this.Tokens= this.Tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}
const userModel = new mongoose.Model("user",userSchema);
module.exports= userModel;