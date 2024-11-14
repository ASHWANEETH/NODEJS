const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json")

const app = express();
const port = 8000;

app.use(express.urlencoded({extended : false}));

// app.get("/api/users/",(req,res)=>{}) if only one request method on route.. if more ->
app.route("/api/users/").get((req,res)=>{
  return res.json(users);
}).post((req,res)=>{
  const body = req.body;
  users.push({id:users.length+1,...body});
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{ return res.json({status:"sucess"})});
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

