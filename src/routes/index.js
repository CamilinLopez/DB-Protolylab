const { Router } = require("express");
const projectRouter = require("./projectRouter");
const { authRouter } = require("../middlewares/google");
const userRouter = require("./userRouter");

const router = Router();

router.use("/project", projectRouter);
router.use("/auth/google", authRouter);
router.use("/user", userRouter);

module.exports = router;
