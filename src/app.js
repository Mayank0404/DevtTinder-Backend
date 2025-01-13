const express=require("express");


// creates the instance of express application
// creates a new web server
const app=express();

// handles the request on the server
// app.use((req,res)=>{
//     res.send("hello from server");
// })
app.use("/hello",(req,res)=>{
    res.send("Hello Hello HEllo");
});

app.use("/test",(req,res)=>{
    res.send("hello from the server test");
});

app.use("/",(req,res)=>{
    res.send("hello from server");
});





// listens to request on the server
app.listen(3000,()=>{
    // only be printed if server will be successfully running
    console.log("server is running on Port 3000");
});




