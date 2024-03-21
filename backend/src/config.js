import { config } from "dotenv";
config();

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.API_KEY;
export const CLOUDINARY_SECRET_KEY = process.env.SECRET_KEY;

export default {
    mongoUrl: process.env.MONGO_ATLAS,
    
}