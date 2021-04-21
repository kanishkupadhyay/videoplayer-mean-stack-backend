const express=require("express");
const app=express()
const dotnev=require("dotenv")
const DB=process.env.Database
const port=process.env.PORT||4000
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require("./db/conn")
const {User,Movies}=require("./model/schema")
app.use(require('./router/auth'))
app.listen(port,()=>console.log(`Server running on port ${port}`))