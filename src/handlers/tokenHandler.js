const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new Error("Token no proporcionado");
    jwt.verify(token, "cammmm123", (err, decoded) => {
      if (err) throw new Error("Token invalido");

      return res.status(200).json({ autenticado: true, usuario: decoded });
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "token invalido", autenticado: false });
  }
};


module.exports = {
  verifyToken,
};
