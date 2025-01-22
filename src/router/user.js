const express=require("express");
const User=require("../models/user");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest")
const USER_PUBLIC_DATA="firstName lastName age skills photoUrl"
// review pending requests or requests received
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
try{

    const loggedInUser=req.user;
    const connectionRequest=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    // }).populate("fromUserId",["firstName","lastName"])
    //  }).populate("fromUserId","firstName lastName photoUrl about age skills")
         }).populate("fromUserId",USER_PUBLIC_DATA)

    res.json({
        message:"Data fetched Successfully",
        data:connectionRequest,
    })
}
  catch(error){
    res.status(400).send("ERROR "+err.messsage);
  }
})

// review the users or requests whi have accepted my requests
userRouter.get("/user/connections",userAuth, async(req,res)=>{
    try {
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
        
          $or:[{fromUserId:loggedInUser._id,status:"accepted"},
            {toUserId:loggedInUser._id,status:"accepted"},
          ]
        }).populate("fromUserId",USER_PUBLIC_DATA)
        .populate("toUserId",USER_PUBLIC_DATA)



        const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({message:"YOUR CONNECTIONS ARE ",
            data
        })
    } catch (error) {
        res.status(400).send("ERROR "+error.message)
    }
})



module.exports=userRouter; 