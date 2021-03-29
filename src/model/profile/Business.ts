import mongoose, { Model, Schema } from "mongoose";
import { reviewSchema } from "../experience/Review";
import { imgSchema } from "../general/Img";
import { placeSchema } from "../general/Place";
import { ProfileBasic } from "./Profile";

export interface IBusiness extends ProfileBasic {
  profileType: "BUSINESS";
  name: string;
  jobs: string[];
}

const businessSchema = new Schema({
  profileType: { type: String, required: true },
  place: placeSchema,
  shortDescription: String,
  description: String,
  imgs: [imgSchema],
  sectors: [String],
  reviews: [reviewSchema],

  name: { type: String, required: true },
  jobs: [String], // change by populate
});

export const Business: Model<IBusiness> = mongoose.model(
  "Business",
  businessSchema,
);
