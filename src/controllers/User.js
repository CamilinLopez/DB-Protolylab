const { users } = require("../database/db");

const verifyAuser = async () => {
  try {
    const data = await users.findAll();
    if (data.length)
      throw new Error("Solo se puede crear un usuario administrador");
  } catch (error) {
    throw error;
  }
};

const addUser = async ({ id, displayName, name, emails, photos }) => {
  try {
    const data = await users.findOne({
      where: { id },
    });

    if (data) return data;

    await verifyAuser();

    const newUser = await users.create({
      id,
      displayName,
      name,
      emails,
      photos,
    });

    if (!newUser)
      throw new Error({
        error: `No se ha podido crear el usuario ${displayName}`,
      });

    return newUser;
  } catch (error) {
    throw error;
  }
};

const dataUser = async (id) => {
  try {
    if (id) {
      const data = await users.findOne({ where: { id } });
      if (!data) throw new Error("No existe este usuario");

      return data;
    }
    const data = await users.findAll();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUser,
  verifyAuser,
  dataUser,
};
