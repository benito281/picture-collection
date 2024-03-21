import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
} from "../config.js";


/* Configuration cloudinary */
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
    secure: true,
  });

  export async function uploadFile(filePath){
    return await cloudinary.uploader.upload(filePath, {
     folder : 'collection_images'
    });
 }
 
 export async function deleteFile(publicId){
     return await cloudinary.uploader.destroy(publicId);
 }