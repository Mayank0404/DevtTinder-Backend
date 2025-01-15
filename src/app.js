
const express=require("express");


// creates the instance of express application
// creates a new web server
const app=express();

// one way of handling errors
app.get("/userData",(req,res)=>{
  
    throw new Error("asdffdsf");
    res.send("User data sent")
});

app.use("/",(err,req,res,next)=>{
    res.status(500).send("Something went wrong")
})
// listens to request on the server
app.listen(7777,()=>{
    // only be printed if server will be successfully running
    console.log("server is running on Port 7777");
});





