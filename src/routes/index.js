const { Router } = require("express");
const projectRouter = require("./projectRouter");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");

const router = Router();

router.use("/project", projectRouter);
router.use("/login", userRouter);
router.use("/auth/google/callback", authRouter);

module.exports = router;
