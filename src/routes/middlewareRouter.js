const Router = require("express");
const { verifyAuser } = require("../controllers/User");

const middlewarRouter = Router();

middlewarRouter.use(async (req, res, next) => {
  try {
    await verifyAuser();
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = middlewarRouter;
