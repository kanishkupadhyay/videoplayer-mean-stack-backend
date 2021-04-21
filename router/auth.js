const express=require("express")
const {User,Movies} = require("../model/schema")
const router=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt = require("bcryptjs/dist/bcrypt")

const authenticate=require("../middleware/authenticate")
router.get("/",(req,res)=>{
    res.send("hello world")
})

router.post("/register",async(req,res)=>{

try{
    
    const newUSer= new User(req.body)
    const result=await  newUSer.save()
    res.json({message:"user registered successfully"})
    res.json({message:result})
}
catch(e){
    res.json(e)
}
})
router.post("/signin",async(req,res)=>{
    try{
        let token
        const {email,password}=req.body
   if(!email || !password){
    return res.status(400).json({err:"please fill date"})

   }
   const userLogin=await User.findOne({email:email})
   if(userLogin){
       const isMatch=await bcrypt.compare(password,userLogin.password)
       token=await userLogin.generateAuthToken()
       console.log(token)
       res.cookie("jwtoken",token,{
           expires:new Date(Date.now()+25892000000),
           httpOnly:true
       })
   }
   if(!isMatch){
       res.status(400).json({err:'invalid credentials'})
   }
   else{
       res.json({msg:"user sign in success"})
   }
   }
   catch(e){
       
   }
})
router.get("/about",authenticate,(req,res)=>{
    res.send("about page")
})
router.get('/movies',async(req,res)=>{
    try{
    const data=await Movies.find()
    res.status(201).send(data)
    }
    catch(e){
        res.status(400).send("Something went wrong",e)
    }
})
router.post("/movies",async(req,res)=>{
    try{
        const newMovie= new Movies(req.body)
        const result=await  newMovie.save()
        res.json({msg:result})

    }catch(e){
       console.log(e)
    }
})
router.get("/movies/:id",async(req,res)=>{
    var ObjectId = require('mongodb').ObjectID;
    try{
const idData= Movies.findById({_id:ObjectId(req.params.id)})
const result=await idData
res.status(201).send(result)
    }
    catch(e){
        res.status(400).send('Something went wrong',e)
    }

})
module.exports=router