 require("dotenv").config();
 const express=require("express");
 const cookieparser=require("cookie-parser")
const connectDb=require("./config/database")
const cors=require("cors")
const app=express();

const User=require("./models/user")


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieparser());


const authRouter=require("./router/auth")
const profileRouter=require("./router/profile")
const requestRouter=require("./router/request")
const userRouter=require("./router/user")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


//calling the function of database connection
connectDb()
.then(async ()=>{ 
    await User.createIndexes();
    console.log("Database Connected");
    app.listen(7777,()=>{
        console.log(`Server is running on PORT ${process.env.PORT}`);
        
    })
    
})
.catch((err)=>{
    console.log("Database is not connected",err);
    
})
 










