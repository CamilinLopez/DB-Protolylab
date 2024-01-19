const { dataUser, changeIsAdmin } = require("../controllers/User");

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

const handleChangeAdmin = async (req, res) => {
  const { isadmin, id } = req.body;

  try {
    const data = await changeIsAdmin(isadmin, id);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  handleGetUser,
  handleLogoutUser,
  handleChangeAdmin,
};
