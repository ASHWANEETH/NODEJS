const http = require("http");
const fs = require("fs");
const url = require("url")

const server = http.createServer((req,res)=>{
  if(req.url === '/favicon.ico') return res.end();

  const Murl = url.parse(req.url,true);

  let logs = `${Date.now()} request recieved ${req.method} ${Murl.pathname} and username = ${Murl.query.username} \n`;

  fs.appendFile("log.txt",logs,(err,data)=>{res.end(`Hi ${Murl.query.username}`);})

  switch (Murl.pathname) {
    case "/" :
      if(req.method == "GET") res.end("Hi" + Murl.query.username);
      break;
    case "/about":
      res.end("This about us!");
      break;
    default :
      res.end("404 not found!")
  }



});

server.listen(8000,() => {console.log("Server started!!")})
  
