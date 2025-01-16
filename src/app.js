
const express=require("express");
const connectDb=require("./config/database")
const app=express();
const User=require("./models/user")
app.use(express.json());

app.post("/signup",async(req,res)=>{
    const user=new User(req.body)
    try {
        await user.save();
        res.send("USer sAved")
    } catch (error) {
        res.status(400).send("Error saving the User",error.message);
    }

})




//calling the function of database connection
connectDb()
.then(()=>{
    console.log("Database Connected");
    app.listen(7777,()=>{
        console.log("Server is running on PORT 7777");
        
    })
    
})
.catch((err)=>{
    console.log("Database is not connected",err);
    
})











