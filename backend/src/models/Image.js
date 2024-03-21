import { Schema, model } from "mongoose";

/* Esquema de BD */
const imageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image : {
    public_id : String,
    secure_url : String
  },
  created_at: { type: Date, default: Date.now() },
},
{
    versionKey : false
});

export default model("Images", imageSchema);
