const express=require("express");


// creates the instance of express application
// creates a new web server
const app=express();

// handles the request on the server
//testing
app.use("/hello",(req,res)=>{
    res.send("Hello Hello HEllo");
});

app.use("/test",(req,res)=>{
    res.send("hello from the server test");
});

app.get("/user",(req,res)=>{
    res.send({firstName:"MAyank",LastNAme:"Sharma"})
})

app.post("/user",(req,res)=>{
    res.send({firstName:"SOumya",LastNAme:"Sharma"})
})

app.delete("/user",(req,res)=>{
    res.send("DEleted Successfully  ")
})
// listens to request on the server
app.listen(7777,()=>{
    // only be printed if server will be successfully running
    console.log("server is running on Port 7777");
});




