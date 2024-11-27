const express = require("express");
const route = express.Router();

const {handleCreateShortId,handleRedirect,handleAnalytics} = require("../controllers/urlHandlers")

route.post("/",handleCreateShortId);
route.get("/:id",handleRedirect);
route.get("/analytics/:id",handleAnalytics);

module.exports={
  route,
}