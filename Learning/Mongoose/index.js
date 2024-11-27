const { timeStamp } = require("console");
const express = require("express");
const fs = require("fs");




const app = express();
const port = 8000;

//monoogse require and db connection --------------------------------------------------
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/firstdb")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("err:",err));


//schema
const userSchema = mongoose.Schema({
  fName:{type:String,required:true,},
  lName:{type:String,},
  email:{type:String,required:true,unique:true},
  gender:{type:String,required:true,}
  
},{timeStamps:true});//add created at and updated at in obejct


const User = mongoose.model("userss",userSchema);


//http status codes-------------------------------->> https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

// 400 bad req --> incomplete req
// 401 unauth
// 403 forbidden
// 404 :) not found






//middlewares -------------------------------------------

//middlewares functions that have acces to req and res obj and next middleware, can change req and res obj, can end req res cycle,..
app.use(express.urlencoded({extended : false}));//built in

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`"${req.method}" Req recieved at "${req.path}" at ${Date.now()} \n`,(err,data)=>{console.log("log updated!")});
    next();
})






//ROUTES-----------------------------------------------

// app.get("/api/users/",(req,res)=>{}) if only one request method on route.. if more ->
app.route("/api/users/").get(async(req,res)=>{
  const allUsers = await User.find({});
  
  res.json(allUsers);
  

}).post(async(req,res)=>{
  const body = req.body;

  const result = await User.create({
    fName : body.first_name,
    lName : body.last_name,
    email : body.email,
    gender : body.gender,
  }) ;

  return res.status(201).json({msg:`sucesss!!!!! user: ${result.fName} added to db`});
})

// :id -> dynamic route
app.route("/api/users/:id") 

.get(async(req,res)=>{
  const usr = await User.find({_id : req.params.id},{_id:0,__v:0});
  res.json(usr);
})

.patch(async(req,res)=>{
  const body = req.body;
  const usrna = await User.findOne({_id : req.params.id},{fName:1,_id:0}); //find one returns one obj if only find it returns array of obj
  const usr = await User.updateOne({_id : req.params.id},{$set:{fName:body.first_name}});
  res.send(`Updated Sucessfully! ${usrna.fName} -> ${body.first_name}`)  ;
})

.delete(async(req,res)=>{
 const del = await User.deleteOne({_id : req.params.id});
 res.send(`Deleted Sucessfully! `)
})

app.listen(port,()=>{
  console.log(`Server started at port: ${port}`);  
})

