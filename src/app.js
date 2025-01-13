const express=require("express");


// creates the instance of express application
// creates a new web server
const app=express();

// handles the request on the server
//testing

// Usig regex

app.get(/a/,(req,res)=>{
    res.send("regex 1 of anywhere a")
})

app.post(/.*fly$/,(req,res)=>{
    res.send("regex start with anything and end with fly")
})


// listens to request on the server
app.listen(7777,()=>{
    // only be printed if server will be successfully running
    console.log("server is running on Port 7777");
});





