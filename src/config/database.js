const mongoose=require("mongoose")

const connectDb= async ()=>{
   await mongoose.connect(
        "mongodb+srv://mayanksharma040404:mayanksharma@devtinderbackend.i251b.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=devTinderBackend"
    )
}

module.exports=connectDb;
