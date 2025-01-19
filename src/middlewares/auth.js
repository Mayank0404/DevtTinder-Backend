const jwt=require("jsonwebtoken")
const User=require("../models/user");
const { request } = require("express");
const userAuth=async (req,res,next)=>{
// read the token from the request cookies validate the token and find the user exist or not
try {
  const {token}=req.cookies;
  if(!token){
    throw new Error("please login");
    
  }
const decodedMessage=await jwt.verify(token,"HELLOSHIVAM@");
const {_id}=decodedMessage;
const user=await User.findById(_id)
if(!user){
    throw new Error("USER NOT FOUND")
}


req.user=user;
next();  
} catch (error) {
   res.status(400).send("Error"+error.message); 
}
}
module.exports={userAuth}