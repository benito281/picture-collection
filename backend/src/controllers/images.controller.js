import fs from "fs-extra";
import { deleteFile, uploadFile } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import Image from "../models/Image.js";
const { unlink } = fs;

/* Obtener todas las imagenes */
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    return res.json(images);
  } catch (error) {
    console.log(error);
    return res.json({ message : error.message});
  }
};


/* Subir Imagen */
export const uploadImage = async (req, res) => {
  const { title, description } = req.body;
  const { path } = req.file;
  if (validationForm(title,description,path).message !== "success") {
      return validationForm();
  }else {
    try {
      const result = await uploadFile(path);
      const newData = new Image({
        title,
        description,
      });
      newData.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
  
      await newData.save(); //Guardado en BD
  
      await unlink(path); //Eliminación de imagen en servidor
  
      return res.json({ message: "Uploaded", type : "success" });
    } catch (error) {
     return res.json({ message: error.message, type : "error" });
    }
  }
};

/* Eliminar imagen */
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOneImage = await Image.findByIdAndDelete(id); //Eliminación del documento
    await deleteFile(deleteOneImage.image.public_id); //Eliminación de imagen
    return res.json({ message: "Deleted", type : "success" });
  } catch (error) {
   return res.json({ message: error.message, type : "error" });
  }
};

/* Eliminar todas las imagenes cargadas */
export const deleteAllImages = async (req, res) => {
  try {
    const getAllImages = await Image.find();
    for (let i = 0; i < getAllImages.length; i++) {
      await deleteFile(getAllImages[i].image.public_id); //Por cada recorrido va a eliminar una imagen
    }
    const deleteAll = await Image.deleteMany();
    return res.json({ message: "Deleted-all", type : "success" });
  } catch (error) {
    return res.json({ message: "error", type : "error" });
  }
};

/* Validación de campos */
function validationForm(title, description, file) {
  if (!title || !description || !file) {
    return { message: "File or fields required" };
  } else {
    if (title == "" || description == "") {
      return { message: "Title or description required" };
    } else {
      return {message : "success"};
    }
  }
}
/* Actualizar imagenes */
export const updateImage = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    if (!req.file) {
      // Si no hay archivo, actualiza solo el título y la descripción
      const updateOneImage = await Image.findByIdAndUpdate(id, { title, description });
      if (updateOneImage) return res.json({ message: "Updated", type : "success" });
    } else {
      // Si hay archivo, actualiza también la imagen
      const path = req.file.path;
      const updateResult = await updateData(id, title, description, path);
      return res.json(updateResult);

    }
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, type : "error" });
  }
};

/* Función auxiliar  */
const updateData = async (id, title, description, path) => {
  try {
    const selectImage = await Image.findById(id);
    let imageUpdate;
    if (path) {
      // Si se proporciona una nueva imagen, subirla a Cloudinary
      const uploadResult = await cloudinary.uploader.upload(path, {
        invalidate: true,
        public_id: selectImage.image.public_id,
        overwrite : true
      });
      imageUpdate = {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      };
      await unlink(path); // Eliminar la imagen local
    } else {
      // Si no se proporciona una nueva imagen, mantener la existente
      imageUpdate = selectImage.image;
    }

    const dataUpdate = await Image.findByIdAndUpdate(
      id,
      { title, description, image: imageUpdate },
      { new: true }
    );

    if (dataUpdate) {
      return { message: "Updated", type : "success" };
    } else {
      return { message: "Element not exist", type : "error" };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, type : "error" };
  }
};
