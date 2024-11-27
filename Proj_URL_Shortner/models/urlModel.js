const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  shortId:{type:String,unique:true,required:true},
  redrUrl:{type:String,required:true},
  visit:{type:Number,default:0},
})

const URL = mongoose.model("urlShort",UrlSchema);

module.exports={
  URL,
}

