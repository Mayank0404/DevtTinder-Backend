
const express=require("express");
const connectDb=require("./config/database")
const app=express();
const User=require("./models/user")
app.post("/signup",async(req,res)=>{
    const user=new User({
        firstName:"Mayank",
        lastName:"Sharma",
        emailId:"mayank@gmail.com",
        password:"12345678"
    });
    await user.save();
    res.send("User Saved successfully")
})




//calling the function of database connection
connectDb()
.then(()=>{
    console.log("Database Connected");
    app.listen(7777,()=>{
        console.log("Server is running on PORT 7777");
        
    })
    
})
.catch((err)=>{
    console.log("Database is not connected",err);
    
})











