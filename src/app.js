 const express=require("express");
 const cookieparser=require("cookie-parser")
const connectDb=require("./config/database")
const jwt=require("jsonwebtoken")
const app=express();
const bcrypt=require("bcrypt")
const User=require("./models/user")
const {validateSignUpData,validateLoginData}=require("./utils/validation")
app.use(express.json());
app.use(cookieparser());


// signup api
app.post("/signup",async(req,res)=>{
    
    try {  
        validateSignUpData(req);
        const {emailId,firstName,lastName,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);        
        const user = new User({
            emailId,
            firstName,
            lastName,
            password:hashedPassword
        });
        await user.save();
        res.send("USer sAved")     
    } catch (error) {
        // res.status(400).send("Error saving the User"+error.message);
        res.status(400).send("Error " + error.message);
    }
})


// login api
app.post("/login",async(req,res)=>{
    try{
        validateLoginData(req);
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});
        if(!user){
            throw new Error("Invalid credentials"); 
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if( isPasswordValid){
            // create a jwt token and 
            const token=await jwt.sign({_id:user._id},"HELLOSHIVAM@")
            res.cookie("token",token);
            // add the token to the cookie and send the response back to the user   
            res.send("User logged in successfull");
        }
        else{ 
            throw new Error("Invalid credentials");
            
        }




    }
    catch(err){
        res.status(400).send("ERROR"+err.message)
    }
})


// users profile
app.get("/profile/",async(req,res)=>{
    const cookies=req.cookies;
    const {token}=cookies;
    try{
        if(!token){
            throw new Error("Invalid token")
        }
    const decodedMessage=jwt.verify(token,)
    const {_id}=decodedMessage;    
    const user=await User.findById(_id)
    if(!user){
        throw new Error("Please login again");
        
    }
    res.send(user);
    }
    catch(err){
        res.status(400).send(err.message);
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
app.patch("/user/:userId",async(req,res)=>{ 
    const userId=req.params.userId
    const data=req.body;
    try {
        const allowed_updates=["photoUrl","skills","gender","about","age"]
        const isUpdateAllowed=Object.keys(data).every((k)=> allowed_updates.includes(k))
        if(!isUpdateAllowed){
            throw new Error("Update not allowed")
        }
        await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true

            // returns the documnet after updating and by defualt its before
        });
        res.send("USER UPDATED SUCCESSFULLY")
    } catch (err) {
        res.status(400).send("Update not allowed"+err.message);   
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
 










