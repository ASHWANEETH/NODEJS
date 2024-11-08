const http = require("http");
const fs = require("fs");
const url = require("url")

const server = http.createServer((req,res)=>{
  if(req.url === '/favicon.ico') return res.end();
  const Murl = url.parse(req.url,true);
  let logs = `${Date.now()} request recieved ${Murl.pathname} and username = ${Murl.query.username} \n`;
  fs.appendFile("log.txt",logs,(data,err)=>{res.end(`Hi ${Murl.query.username}`);})
  console.log(Murl);
});

server.listen(8000,() => {})
  
