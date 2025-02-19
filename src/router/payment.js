const express=require("express")
const {userAuth}=require("../middlewares/auth")
const paymentRouter=express.Router();
const instance=require("../utils/razopay")
const Payment=require("../models/payments")
const {membershipAmount}=require("../utils/constants")
paymentRouter.post("/payment/create",userAuth,async (req,res)=>{
try {
    const {membershiptype}=req.body;
    const order= await instance.orders.create({
       amount:membershipAmount[membershiptype]*100, 
       currency:"INR",
       receipt:"rec#1",
       notes:{
           firstName:req.user.firstName,
           lastName:req.user.lastName,

           emailId:req.user.emailId,
           membershipType:membershiptype,
       },
    })
    console.log(order);
    const payment= new Payment({
        userId:req.user._id,
        orderId:order.id,
        status:order.status,
        amount:order.amount,
        currency:order.currency,
        receipt:order.receipt,
        notes:order.notes,
    })
    const savedPayment=await payment.save();
    console.log(savedPayment);
    
    res.json({...savedPayment.toJSON(),keyId:process.env.RZR_KEY_ID});
    
} catch (error) {
    return res.status(500).json({msg:error.message});
    
}


});




module.exports=paymentRouter;