
const express=require("express");
const connectDb=require("./config/database")
const app=express();
const User=require("./models/user")
app.use(express.json());
app.post("/signup",async(req,res)=>{
    const user = new User(req.body);
    try {    
        await user.save();
        res.send("USer sAved")     
    } catch (error) {
        // res.status(400).send("Error saving the User"+error.message);
        if (error.code === 11000) {
            return res.status(400).send("Email already exists");
        }
        res.status(400).send("Error saving the user: " + error.message);
    }
})

// find user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
       const user= await User.findOne({emailId:userEmail});
       if(!user){
        res.status(404).send("User not found");
       }
       else{
        res.send(user);
       }
    }
    catch(err){
        res.status(404).send("Something went wrong",err.message);
    }
})
//feed api
app.get("/feed",async(req,res)=>{
    try {
        const users=await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).send("SOmething went wrong");
    }
})
//delete a user
app.delete("/user",async(req,res)=>{
    const id=req.body.userId;
    try {
        // const user=await User.findByIdAndDelete({_id:id})
        const user=await User.findByIdAndDelete(id);
        res.send("USER DELTED SUCCESSFULLY");
    } catch (error) {
        res.status(500).send("Something went wrong",error.message);
    }


})
//update user by id
app.patch("/user",async(req,res)=>{
    const userId=req.body.userId
    const data=req.body;
    try {
        await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true

            // returns the documnet after updating and by defualt its before
        });
        res.send("USER UPDATED SUCCESSFULLY")
    } catch (err) {
        res.status(400).send("Something Went Wrong"+err.message);   
    }
})
// update user by email id
app.patch("/userUpdate",async(req,res)=>{
    console.log("APi Hitted");
    
        const data=req.body;
        const email=req.body.emailId;

    try {
        await User.findOneAndUpdate({emailId:email},data);
        res.send("USER UPDATED BY EMAILID")
    } catch (err) {
        res.status(400).send("SOMETHING WENT WRONG")
    }
})
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
 










