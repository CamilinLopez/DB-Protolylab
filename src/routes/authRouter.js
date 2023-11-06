const Router = require("express");
const passport = require("../middlewares/google");
const { handleGetUser } = require("../handlers/userHandler");

const authRouter = Router();

authRouter.get("/", passport.authenticate("google", {}), handleGetUser);

module.exports = authRouter;
