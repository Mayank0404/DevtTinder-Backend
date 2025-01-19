const validator=require("validator")

const validateSignUpData=(req)=>{
    const {emailId,firstName,lastName,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a Strong Password")
    }
}

const validateLoginData=(req)=>{
    const{emailId}=req.body
    if(!validator.isEmail(emailId)){
        throw new Error(":Enter Valid email");
        
    }
}

module.exports={
    validateSignUpData,validateLoginData
}