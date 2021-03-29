import { Schema } from "mongoose";

export interface Img {
  img: string;
  description?: string;
}

export const imgSchema = new Schema({
  img: {type: String, required: true},
  description: String
})