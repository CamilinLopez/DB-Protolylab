const { Router } = require("express");
const tokenRouter = Router();

const { verifyToken } = require("../handlers/tokenHandler");

tokenRouter.get("/", verifyToken);


module.exports = tokenRouter;
