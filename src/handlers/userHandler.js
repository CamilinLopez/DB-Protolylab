const { dataUser } = require("../controllers/User");

const handleGetUser = async (req, res) => {
  const { id } = req.query;

  try {
    const data = await dataUser(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handleLogoutUser = (req, res, next) => {
  req.logout((err) => {
    return next(err);
  });
  res.status(200).send("Sesion finalizada");
};

module.exports = {
  handleGetUser,
  handleLogoutUser,
};
