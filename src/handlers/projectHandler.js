const {
  addProject,
  checkProject,
  deleteProject,
  updateProject,
  readProjects,
} = require("../controllers/Project");
const { uploadImage } = require("../cloudinary/cloudinary");
const { catchEmpty, isItImage } = require("../utils/index");

const handlerPostProject = async (req, res) => {
  const obj = {
    nombre: req.body.nombre || undefined,
    texto: req.body.texto || undefined,
    imagen: req.body.imagen || undefined,
    website: req.body.website || undefined,
  };
  try {
    catchEmpty(obj);
    await checkProject(obj.nombre);
    // isItImage(obj.imagen);
    const result = await uploadImage(obj.imagen);
    const objDB = {
      nombre: obj.nombre,
      texto: obj.texto,
      linkimagen: result.secure_url,
      idimage: result.public_id,
      website: obj.website,
    };

    const data = await addProject(objDB);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handlerDeleteProject = async (req, res) => {
  const obj = {
    id: req.query.id || undefined,
  };
  console.log(obj.id)
  try {
    catchEmpty(obj);
    const data = await deleteProject(obj.id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handlePutProject = async (req, res) => {
  const obj = {
    id: req.body.id || undefined,
    newdata: req.body.newdata || undefined,
  };

  try {
    // catchEmpty(obj);
    const data = await updateProject(obj);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const handleGetProject = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await readProjects(id);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  handlerPostProject,
  handlerDeleteProject,
  handlePutProject,
  handleGetProject,
};
