const imageType = require("image-size");

const catchEmpty = (obj) => {
  const undefinedProperties = [];

  for (const key in obj) {
    obj[key] === undefined && undefinedProperties.push(key);
  }
  if (undefinedProperties.length)
    throw new Error(`Agrege un ${undefinedProperties}`);
};

const isItImage = (img) => {
  const dimensions = imageType(img);
  if (!dimensions.type) throw new Error("Agrega una imagen");
};

module.exports = { catchEmpty, isItImage };
