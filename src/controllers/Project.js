const { deleteImage } = require("../cloudinary/cloudinary");
const { projects } = require("../database/db");

const checkProject = async (nombre) => {
  try {
    const record = await projects.findOne({ where: { nombre } });
    if (record)
      throw new Error(`El proyecto ${nombre.toUpperCase()} ya existe`);
  } catch (error) {
    throw error;
  }
};

const addProject = async ({ nombre, texto, linkimagen, idimage }) => {
  try {
    const [project, created] = await projects.findOrCreate({
      where: { nombre },
      defaults: { nombre, texto, linkimagen, idimage },
    });
    if (!created)
      throw new Error(`El proyecto ${nombre.toUpperCase()} ya exsite`);
    return `Sea ha agregado el proyecto ${nombre.toUpperCase()}`;
  } catch (error) {
    throw error;
  }
};

const updateProject = async ({ id, newdata }) => {
  try {
    const [rowUpdated] = await projects.update(newdata, {
      where: { id },
    });
    if (rowUpdated > 0) return "Actualizado";
    else throw new Error("No se ha actualizado");
  } catch (error) {
    throw error;
  }
};

const deleteProject = async (id) => {
  try {
    const data = await projects.findByPk(id);
    if (!data) throw new Error(`No existe un proyecto con el id ${id}`);

    const name = data.nombre;
    await deleteImage(data.idimage);

    data.destroy();

    return `El proyecto ${name.toUpperCase()} se ha eliminado`;
  } catch (error) {
    throw error;
  }
};

const readProjects = async () => {
  try {
    const data = await projects.findAll();
    if (!data.length) throw new Error("No hay proyectos");

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addProject,
  checkProject,
  deleteProject,
  updateProject,
  readProjects,
};
