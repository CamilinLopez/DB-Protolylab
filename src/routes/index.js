const { Router } = require("express");
const projectRouter = require("./projectRouter");
const { authRouter } = require("../middlewares/google");
const tokenRouter = require("./tokenRouter");
const userRouter = require("./userRouter");

const router = Router();

router.use("/project", projectRouter);
router.use("/auth/google", authRouter);
router.use("/verify", tokenRouter);
router.use("/user", userRouter);

module.exports = router;
