const express = require("express");

const users = require("./MOCK_DATA.json")

const app = express();
const port = 8000;


// app.get("/api/users/",(req,res)=>{}) if only one request method on route.. if more ->
app.route("/api/users/").get((req,res)=>{
  return res.json(users);
})

// :id -> dynamic route
app.route("/api/users/:id").get((req,res)=>{
  const id = Number(req.params.id);
  const usr = users.find((users)=>users.id === id);
  res.json(usr.first_name);
  console.log(usr);
})

app.listen(port,()=>{
  console.log(`Server started at port: ${port}`);
})

