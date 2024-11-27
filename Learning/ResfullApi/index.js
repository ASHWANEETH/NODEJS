const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

const app = express();
const port = 8000;


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
app.route("/api/users/").get((req,res)=>{

  //header --> contains meta-data(data about data) ,, both req and res :)
  res.setHeader("X-MyName","Jhony"); // add X- prefix custom header (!best practise)
  // console.log(req.headers); //print req headers


  return res.json(users);
}).post((req,res)=>{
  const body = req.body;
  users.push({id:users.length+1,...body});
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{ return res.status(201).json({status:"sucess"})});
})

// :id -> dynamic route
app.route("/api/users/:id")

.get((req,res)=>{
  const id = Number(req.params.id);
  const usr = users.find((users)=>users.id === id);
  res.json(usr);
})

.patch((req,res)=>{
  const body = req.body;
  const id = Number(req.params.id);
  users.find((users)=>users.id === id).first_name = body.first_name;
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{ return res.json({status:"sucess"})});
})

.delete((req,res)=>{
  const id = Number(req.params.id);
  users.splice(users.findIndex((users)=>users.id === id),1);
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{ return res.json({status:"sucess"})});
})

app.listen(port,()=>{
  console.log(`Server started at port: ${port}`);
})

