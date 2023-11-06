const handleGetUser = (req, res) => {
  if (req.isAuthenticated()) res.status(200).send("autentificacion exitosa");
  else res.status(400).send("Error de autentificacion");
};

module.exports = {
  handleGetUser,
};
