
const Router = require("express");
const projectRouter = Router();
const {
  handlerPostProject,
  handlerDeleteProject,
  handlePutProject,
  handleGetProject,
} = require("../handlers/projectHandler");

projectRouter.post("/", handlerPostProject);
projectRouter.delete("/", handlerDeleteProject);
projectRouter.put("/", handlePutProject);
projectRouter.get("/", handleGetProject);

module.exports = projectRouter;
