const express = require("express");
const route = express.Router();

const {handleCreateShortId,handleRedirect} = require("../controllers/urlHandlers")

route.post("/",handleCreateShortId);
route.get("/:id",handleRedirect);

module.exports={
  route,
}