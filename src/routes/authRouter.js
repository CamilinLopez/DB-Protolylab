// const Router = require("express");
// const passport = require("../middlewares/google");
// const { verifyAuser } = require("../controllers/User");
// const googlePassport = require("../middlewares/google");

// const authRouter = Router();

// authRouter.use(async (req, res, next) => {
//   try {
//     await verifyAuser();
//     next();
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// authRouter.use(
//   googlePassport.authenticate("google", { scope: ["profile", "email"] })
// );

// authRouter.get(
//   "/callback",
//   passport.authenticate("google", {
//     successRedirect: "/auth/google/profile",
//     failureRedirect: "/user/login",
//   })
// );

// authRouter.get("/profile", (req, res) => {
//   console.log(req.isAuthenticated());
//   res.status(200).send("hola");
// });

// module.exports = authRouter;
