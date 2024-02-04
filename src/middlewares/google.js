const passport = require("passport");
const { addUser, verifyUser } = require("../controllers/User");
const { catchEmpty } = require("../utils");
const { users } = require("../database/db");
const authRouter = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URL_CALLBACK_PRODUCTION,
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
    const user = await users.findOne({ where: { id } });
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

      if (token)
        await users.update({ token: token }, { where: { id: req.user.id } });

      res.redirect(`${process.env.CLIENT_PRODUCTION_URL}/dashboard?id=${req.user.id}`);
    } else res.redirect("/auth/google");
  }
);

authRouter.get("/logout", (req, res) => {
  // req.logout((err) => {
  //   if (err) return next(err);

  //   res.redirect(`${process.env.CLIENT_DEVELOPMENT_URL}`);
  // });
  res.redirect(`${process.env.CLIENT_PRODUCTION_URL}`);
});

authRouter.get("/verify", async (req, res) => {
  const { id } = req.query;

  try {
    const data = await verifyUser(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { passport, authRouter };
