const express=require("express");


// creates the instance of express application
// creates a new web server
const app=express();

// handles the request on the server
//testing

// advance routing

app.get("/user/ab?c",(req,res)=>{
    res.send("B is optional")
})
 
app.post("/user/ab+c",(req,res)=>{
    res.send("Any number of b")
})

app.post("/ab*cd",(req,res)=>{
    res.send("ANything between ab and cd")
})

app.get("/a(bc)+d",(req,res)=>{
    res.send("Grouping is done of bc anynumber of bc")
})

// listens to request on the server
app.listen(7777,()=>{
    // only be printed if server will be successfully running
    console.log("server is running on Port 7777");
});





