const passport = require("passport");
const { addUser, dataUser, verifyTokenAdmin } = require("../controllers/User");
const { catchEmpty } = require("../utils");
const users = require("../database/db");
const authRouter = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

var GoogleStrategy = require("passport-google-oauth20").Strategy;
// https://protolylab.onrender.com/auth/google/callback
// http://localhost:3001/auth/google/callback
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://protolylab.onrender.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const user = {
          id: profile.id,
          displayName: profile.displayName,
          name: profile.name,
          emails: profile.emails,
          photos: profile.photos,
        };
        await catchEmpty(user);

        const newUser = await addUser(user);
        return cb(null, newUser);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await users.findById(id);
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

authRouter.use((err, req, res, next) => {
  if (err) res.status(400).send(err.message);
  else next();
});

authRouter.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  async (req, res) => {
    if (req.isAuthenticated()) {
      const token = jwt.sign(
        {
          userId: req.user.id,
          email: req.user.email,
        },
        "cammmm123",
        { expiresIn: "1h" }
      );

      const data = await dataUser(req.user.id);
      res.cookie("iduser", req.user.id, {
        sameSite: "none",
        secure: true,
      });

      //http://localhost:3000/dashboard
      //https://www.protolylab.digital

      res.redirect(`http://localhost:3000/dashboard`);
    } else res.redirect("/auth/google");
  }
);

authRouter.get("/logout", (req, res) => {
  // req.logout((err) => {
  //   if (err) return next(err);

  //   res.redirect("http://localhost:3000");
  // });
  //https://www.protolylab.digital
  res.redirect("http://localhost:3000");
});

authRouter.get("/verify", async (req, res) => {
  if (req.isAuthenticated()) {
    // Accede a los datos del usuario desde la sesión
    const dataUser = req.session.passport.user;

    res
      .status(200)
      .send({ info: dataUser, message: "Sí hay información de usuario" });
  } else {
    res.status(200).send({ message: "No autenticado" });
  }
});

module.exports = { passport, authRouter };
