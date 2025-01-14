const express=require("express");


// creates the instance of express application
// creates a new web server
const app=express();

// multiple route handlers

// app.use("/user",(req,res,next)=>{
//     console.log("route handler 1");
//     next();
//     // res.send("Route 1");
// },(req,res)=>{
//     res.send("Response 2");
// }) 
// op will be response 2

// app.use("/user",
//     (req,res,next)=>{
//     console.log("USER ROUTE HANDLER 1")
//     next();
//     res.send("Route 1")

// },(req,res)=>{
//     console.log("USER ROUTE HANDLER 2");
//     res.send("RESPONSE 2")
    
// })
//output will be response 2 as next will send to next route handler and the error will be in res.send route1 due to route 2 res.send will already have sent

// app.use("/user",(req,res,next)=>{
//     console.log("route handle 1");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 2");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 1");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 1");
//     res.send("DOne")
// })
// output wille bw done witha all console

// app.use("/user",(req,res,next)=>{
//     console.log("route handle 1");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 2");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 1");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 1");
//     next();
// })
// all will log but error in as no res has been sent and it will expect more of the route handle due tolast next

// app.use("/user",[(req,res,next)=>{
//     console.log("route handle 1");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 2");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 1");
//     next();
// },(req,res,next)=>{
//     console.log("route handle 1");
//     res.send("DOne")
// }])
// can even send array of functions or route handlers



// listens to request on the server
app.listen(7777,()=>{
    // only be printed if server will be successfully running
    console.log("server is running on Port 7777");
});





