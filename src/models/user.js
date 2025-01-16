const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:50,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true, 
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number ,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
          
    },
    about:{
        type:String,
        default:"This is default information about user"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
});

const User=mongoose.model("User",userSchema);

module.exports=User;  