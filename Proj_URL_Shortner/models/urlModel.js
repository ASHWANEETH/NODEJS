const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  shortId:{type:String,unique:true},
  redrUrl:{type:String,required:true},
  visit:{type:Number},
})

const URL = mongoose.model("urlShort",UrlSchema);