const { Router } = require("express");
const projectRouter = require("./projectRouter");

const router = Router();

router.use("/project", projectRouter);

module.exports = router;
