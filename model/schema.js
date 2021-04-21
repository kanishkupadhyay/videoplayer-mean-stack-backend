const mongoose=require("mongoose")
const  bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userSchema=mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    tokens:[
        {
        token:{
            type:String,
            required:true
        }
    }
    ]
})

const moviesSchema=mongoose.Schema({
    categoryId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    actor:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    iframe:{
        type:String,
        required:true
    },
    imgsrc:{
        type:String,
        required:true
    },
    uploadDate:{
        type:String,
        required:true
    }
})


userSchema.pre('save',async function(next){
if(this.isModified('password')){
this.password=await bcrypt.hash(this.password,12)
this.confirmPassword=await bcrypt.hash(this.confirmPassword,12)
}
next()
})
const SecretKey='KANISHKUPADHYAYISASOFTWAREDEVELOPERHEISBCASTUDENT'
userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},SecretKey)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(err){
        console.log(err)
    }
}
const User=mongoose.model('user',userSchema)
const Movies=mongoose.model('movie',moviesSchema)
module.exports={User,Movies}