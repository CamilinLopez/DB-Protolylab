const { users } = require("../database/db");
const jwt = require("jsonwebtoken");
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

    // await verifyAuser();

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

const changeIsAdmin = async (isadmin, id) => {
  try {
    const user = await users.findOne({ where: { id } });
    if (!user) throw new Error("No exsiste un usuario con este id");

    const result = await users.update(
      { isadmin: !isadmin },
      { where: { id: id } }
    );

    const newadminuser = await users.findOne({ where: { id } });
    return newadminuser.isadmin;
  } catch (error) {
    throw error;
  }
};

const verifyTokenAdmin = async (infoUser) => {
  try {
    const user = await users.findOne({ where: { id: infoUser.id } });
    if (!user) throw new Error("usuario no encontrado");

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(infoUser.token, "cammmm123", (err, decode) => {
        if (err) reject(new Error("Token invalido"));
        resolve({ autenticado: true, usuario: decode, isadmin: true });
      });
    });
    return decoded;
  } catch (error) {
    throw error;
  }
};

const verifyUser = async (userid) => {
  try {
    if (!userid) throw { error: "no hay id" };

    const user = await users.findOne({ where: { id: userid } });
    if (!user) throw { error: `usuario no encontrado con el id ${userid}` };

    const decode = await new Promise((resolve, reject) => {
      jwt.verify(user.token, "cammmm123", (err, decode) => {
        if (err)
          reject({
            validtoken: false,
            user: !decode && "none",
            isadmin: user.isadmin,
          });
        resolve({
          validtoken: true,
          user: decode,
          isadmin: user.isadmin,
          token: user.token,
        });
      });
    });
    return decode;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUser,
  verifyAuser,
  dataUser,
  changeIsAdmin,
  verifyTokenAdmin,
  verifyUser,
};
