import { placeSchema } from "./../general/Place";
import { Schema } from "mongoose";
import { Experience } from "./Experience";

export interface Education extends Experience {
  institution: string;
}

export const educationSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  place: placeSchema,
  link: String,

  institution: { type: String, required: true },
});
