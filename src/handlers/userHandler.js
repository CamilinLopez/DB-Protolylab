const handleGetUser = (req, res) => {
  // console.log(req)
  res.status(200).send({user: req.user});
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
