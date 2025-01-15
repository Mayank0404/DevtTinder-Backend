const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAdminAuth=token==="xyz";
    console.log("Checking admin");
    
    if(!isAdminAuth){
        res.status(401).send("Unauthorized by admin");
    }
    else{
        next();
    }
}

const userAuth=(req,res,next)=>{
    const token="us";
    const isUserAuth=token==="user"
    console.log("checking user");
    
    if(!isUserAuth){
        res.status(401).send("unauthorized  User");
    }
    else{
        next();
    }
}

module.exports={adminAuth,userAuth}