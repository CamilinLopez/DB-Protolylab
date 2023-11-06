const Router = require("express");
const { verifyAuser } = require("../controllers/User");
const googlePassport = require("../middlewares/google");

const userRouter = Router();

userRouter.use(async (req, res, next) => {
  try {
    await verifyAuser();
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.use(
  googlePassport.authenticate("google", { scope: ["profile", "email"] })
);


module.exports = userRouter;
