// const jwt=require("jsonwebtoken")
// const User=require("../models/user");
// const userAuth=async (req,res,next)=>{
// // read the token from the request cookies validate the token and find the user exist or not
// try {
//   const {token}=req.cookies;
//   if(!token){
//     throw new Error("please login");
    
//   }
// const decodedMessage=await jwt.verify(token,"HELLOSHIVAM@");
// const {_id}=decodedMessage;
// const user=await User.findById(_id)
// if(!user){
//     throw new Error("USER NOT FOUND")
// }


// req.user=user;
// next();  
// } catch (error) {
//    res.status(400).send("Error"+error.message); 
// }
// }
// module.exports={userAuth}

const jwt=require("jsonwebtoken")
const User=require("../models/user")

const userAuth=async(req,res,next)=>{
  try {
    const {token}=req.cookies;
    if(!token){
      throw new Error("Invalid tokenn");
    }
 const decodedMessage=await jwt.verify(token,"HELLOSHIVAM@");
    const {_id}=decodedMessage;
    const user=await User.findById(_id);
    if(!user){
      throw new Error("User not Found");
    }
    req.user=user;
    next();

  } catch (error) {
    res.status(400).send("error"+error.message)
  }
}

module.exports={userAuth}