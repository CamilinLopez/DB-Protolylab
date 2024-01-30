const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index");
const passport = require("passport");
const session = require("express-session");

const server = express();

server.use(
  session({
    secret: "asafeas-efe52wa23ds*",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Ajusta según tu entorno (puede ser true en producción con HTTPS)
      sameSite: "none",
    },
  })
);

server.use(
  cors({
    origin: "https://www.protolylab.digital",
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Request-ID"],
  })
);

server.use(cookieParser());

server.use(express.json({ limit: "300mb" })); // Utiliza el middleware integrado de Express
server.use(express.urlencoded({ extended: true, limit: "300mb" })); // Utiliza el middleware integrado de Express
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

module.exports = server;
