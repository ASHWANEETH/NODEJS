const fs = require("fs");


// client req > event queue > event loop >
          // if non blocking > process and respond
          // if blocking > process to thread pool (threads = workers) > respond




//blocking  
// fs.writeFileSync("./example1.txt","writing file with fs"
// )

//non blocking  
// fs.writeFile("./example1.txt","writing file with fs");

// fs.appendFileSync("./example1.txt","\n appending data")

// console.log(fs.readFileSync("./example1.txt","utf-8"));

// fs.mkdirSync("newDirWithFS")

