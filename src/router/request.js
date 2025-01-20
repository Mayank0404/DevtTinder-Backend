const express=require("express");
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");
const { findById } = require("../models/user");
const requestRouter=express.Router();
//api to send connection request
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try {
         const toUserId=req.params.toUserId;
        const status=req.params.status;
        const fromUserId=req.user._id;
        const allowedStatus=[
            "ignored",
            "interested"
        ] 
        if(!allowedStatus.includes(status)){
            return  res.status(400).json({message:"Invalid status type "+status})
        }
        const isUserPresent=await User.findById(toUserId);
        if(!isUserPresent){
            return res.status(400).send("THe User YOu are tring to send Does not exisst");
        }
        const existingConnection=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        if(existingConnection){
            return res.status(400).send("Connection already exists")
        }
        const connectionRequest=new ConnectionRequest({
            toUserId,
            fromUserId,
            status, 
        });
        const data=await connectionRequest.save();          
        res.json({
            message:req.user.firstName+" is "+status+" in "+isUserPresent.firstName,
            data,
        })
    } catch (error) {
        res.status(400).send("ERROR "+error.message)
    }

})

module.exports=requestRouter;