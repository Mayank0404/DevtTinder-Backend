 const express=require("express");
 const cookieparser=require("cookie-parser")
const connectDb=require("./config/database")
const app=express();
const User=require("./models/user")


app.use(express.json());
app.use(cookieparser());


const authRouter=require("./router/auth")
const profileRouter=require("./router/profile")
const requestRouter=require("./router/request")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


//calling the function of database connection
connectDb()
.then(async ()=>{ 
    await User.createIndexes();
    console.log("Database Connected");
    app.listen(7777,()=>{
        console.log("Server is running on PORT 7777");
        
    })
    
})
.catch((err)=>{
    console.log("Database is not connected",err);
    
})
 










