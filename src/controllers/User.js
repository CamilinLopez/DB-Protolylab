const { use } = require("passport");
const { users } = require("../database/db");

const addUser = async ({ id, displayName, name, emails, photos }) => {
  try {
    const [user, created] = await users.findOrCreate({
      where: { id },
      defaults: { id, displayName, name, emails, photos },
    });
    if (!created)
      return {
        error: `No se ha creado el usuario ${displayName}`,
      };

    return user;
  } catch (error) {
    throw error;
  }
};

const verifyAuser = async () => {
  try {
    const data = await users.findAll();
    if (data.length > 0)
      throw new Error("Solo se puede crear un usuario administrador");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUser,
  verifyAuser,
};
