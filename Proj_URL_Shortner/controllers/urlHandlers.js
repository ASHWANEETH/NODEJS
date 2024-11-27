const {nanoid} = require("nanoid");
const {URL} = require("../models/urlModel");

async function handleCreateShortId(req,res){
  const body = req.body;
  if(!body.url) res.status(400).json({err:"no Url found"});
  const Short = nanoid(8);
  await URL.create({
    shortId: Short,
    redrUrl: body.url,
  });
  res.status(200).json({msg:"sucess !",shortUrl:Short});
  
}


async function handleRedirect(req,res) {

  const short = req.params.id;
  const ent = await URL.findOneAndUpdate({shortId:short},{$inc:{visit:1}});
  // console.log(ent);

  res.redirect(ent.redrUrl);
}

async function handleAnalytics(req,res) {

  const short = req.params.id;
  const resObj = await URL.findOne({shortId:short});
  res.status(200).send(`You visited this site ${resObj.visit} times !`)
  
}

module.exports={
  handleCreateShortId,
  handleRedirect,
  handleAnalytics,
}