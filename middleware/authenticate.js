const jwt=require("jsonwebtoken")
const User=require("../model/schema")
const Authenticate= async(req,res,next)=>{
try{

    const token=req.cookies.jwtoken
    const verifyToken=jwt.verify(token,'KANISHKUPADHYAYISASOFTWAREDEVELOPERHEISBCASTUDENT')
    const routeUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
    if(!routeUser){
        throw new Error('user not found')
    }
    req.token=token
    req.routeUser=routeUser
    req.userId=routeUser._id
}catch(e){
    res.status(401).send("unauthorised")
    console.log(e)
}
}
module.exports=Authenticate