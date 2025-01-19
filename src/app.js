 const express=require("express");
 const cookieparser=require("cookie-parser")
const connectDb=require("./config/database")
const jwt=require("jsonwebtoken")
const app=express();
const bcrypt=require("bcrypt")
const {userAuth}=require("./middlewares/auth")
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
        const isPasswordValid=await user.validatePassword(password);
        if( isPasswordValid){
           const token=await user.getJWT();
            res.cookie("token",token,{
                expires:new Date(Date.now()+    1*3600000)
            });
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
app.get("/profile/",userAuth,async(req,res)=>{
    try{   
    const user=req.user;
    res.send(user);
    }
    catch(err){
        res.status(400).send(err.message);
    }
    
})

//api to send connection request
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
const {user}=req.user;
console.log("sending request"+req.user.firstName);
res.send("request sent by"+req.user.firstName);

})







//update user by id
app.patch("/user/:userId",userAuth,async(req,res)=>{ 
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
 










