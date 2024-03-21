import { Router } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import {
  getAllImages,
  uploadImage,
  updateImage,
  deleteImage,
  deleteAllImages,
} from "../controllers/images.controller.js";
const router = Router();

//Configuración de rutas
const { join, extname, dirname } = path;
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectory = join(__dirname, '../public');

/* Alamcenamiento de imagenes */
const storedFile = multer.diskStorage({
  destination: join(publicDirectory, "/img/upload"),
  filename: (req, file, cb) => {
    cb(null, uuid() + extname(file.originalname).toLocaleLowerCase());
  },
});

//Validación de imagenes
const upload = multer({
  storage: storedFile,
  limits: {
    fileSize: 8000000, // Se agrega el limite del archivo
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extnames = filetypes.test(extname(file.originalname));
    if (mimetype && extnames) {
      return cb(null, true);
    }
    cb("Error: The file should be an image");
  },
}).single("image");

/* Obtener todas las imagenes */
router.get("/images", getAllImages);

/* Subir imagenes */
router.post("/upload-image", upload, uploadImage);

/* Actualizar imagen */
router.put("/image/:id/update", upload, updateImage);

/* Eliminar imagen*/
router.delete("/image/:id/delete", deleteImage);

/* Eliminar todas las imagenes */
router.delete("/delete-all", deleteAllImages);

export default router;
