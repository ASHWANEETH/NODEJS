const express = require("express");
const {ConnectionHandle} = require("./connection");
const {route} = require("./routes/urlRoutes");

const app = express();
const port = 8002;

app.use(express.json());

app.use("/url",route);
ConnectionHandle("mongodb://127.0.0.1:27017/ShortUrl").then(()=>console.log(`Database connected Sucessfully!!`));


app.listen(port,()=>{console.log(`Server Started at port : ${port}`)});