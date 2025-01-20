const express=require("express");
const {userAuth}=require("../middlewares/auth")
const requestRouter=express.Router();
//api to send connection request
requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
const {user}=req.user;
console.log("sending request"+req.user.firstName);
res.send("request sent by"+req.user.firstName);

})

module.exports=requestRouter;