const express=require("express");


// creates the instance of express application
// creates a new web server
const app=express();
//creating mutiple route handler for same route
app.get("/user",(req,res,next)=>{
    console.log("1st route handler");
    next();    
})
app.get("/user",(req,res,next)=>{
    console.log("2nd route handler");
    res.send("2nd route")
    
})
// listens to request on the server
app.listen(7777,()=>{
    // only be printed if server will be successfully running
    console.log("server is running on Port 7777");
});





