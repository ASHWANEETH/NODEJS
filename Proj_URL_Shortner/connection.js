const mongoose = require("mongoose");

function ConnectionHandle(url){
  return mongoose.connect(url);
}
module.exports={
  ConnectionHandle,
}