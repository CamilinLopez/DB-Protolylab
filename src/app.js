const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index");
const passport = require("passport");
const session = require("express-session");

const server = express();

server.use(cookieParser());

server.use(
  session({
    secret: "asafeas-efe52wa23ds*",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: "none",
    },
  })
);

server.use(
  cors({
    origin: ["https://protolylab.onrender.com/", "http://localhost:3000/"],
    credentials: true,
  })
);

server.use(bodyParser.urlencoded({ extended: true, limit: "300mb" }));
server.use(bodyParser.json({ limit: "300mb" }));
server.use(morgan("dev"));
server.use(passport.initialize());
server.use(passport.session());

server.use("/", routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// server.use(express.json());

module.exports = server;
