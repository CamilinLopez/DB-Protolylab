const { handleGetUser } = require("../handlers/userHandler");

const Router = require("express");

const userRouter = Router();

userRouter.get("/", handleGetUser);


module.exports = userRouter;
