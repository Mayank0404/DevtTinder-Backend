
const express=require("express");


// creates the instance of express application
// creates a new web server
const app=express();

const {adminAuth,userAuth}=require("./middlewares/authmiddleware");

// creatinng a middleware for admin dummy

app.use("/admin",adminAuth);
// single user route so writing it in the api only
app.post("/user/login",(req,res)=>{
    res.send("User logged in");
})

app.get("/user/userData",userAuth,(req,res)=>{
    res.send("USer Data ")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("All data Sent")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("USER Deleted By Admin")
})


   


// listens to request on the server
app.listen(7777,()=>{
    // only be printed if server will be successfully running
    console.log("server is running on Port 7777");
});





