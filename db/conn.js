const mongoose=require("mongoose")
// const dotnev=require("dotenv")
// dotnev.config({path:'../config.env'})
// const DB=process.env.DATABASE

// const dataBase="mongodb://localhost:27017/videodata"
const DB="mongodb+srv://kanishk:kanishk123@cluster0.7tsua.mongodb.net/users?retryWrites=true&w=majority"
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(()=>{
    console.log("connection established")
})
.catch((e)=>{
    console.log("connection rejected",e)
})
