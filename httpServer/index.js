const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
  let logs = `${Date.now()} request recieved \n`;
  fs.appendFile("log.txt",logs,(data,err)=>{res.end("Hi Brooo");})

});

server.listen(8000,() => {})
  
