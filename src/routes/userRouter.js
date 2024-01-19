const { handleGetUser, handleChangeAdmin } = require("../handlers/userHandler");

const Router = require("express");

const userRouter = Router();

userRouter.get("/", handleGetUser);
userRouter.put("/", handleChangeAdmin);

module.exports = userRouter;
