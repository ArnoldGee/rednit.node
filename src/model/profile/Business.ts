import { IJob } from './../Job';
import mongoose, { Model, Schema } from "mongoose";
import { reviewSchema } from "../experience/Review";
import { imgSchema } from "../general/Img";
import { placeSchema } from "../general/Place";
import { ProfileBasic } from "./Profile";

export interface IBusiness extends ProfileBasic {
  profileType: "BUSINESS";
  name: string;
  jobs: string[] | IJob[];
}

const businessSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  profileType: { type: String, required: true },
  slug: { type: String, required: true },
  place: placeSchema,
  shortDescription: String,
  description: String,
  imgs: [imgSchema],
  sectors: [String],
  reviews: [reviewSchema],

  name: { type: String, required: true },
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
});

export const Business: Model<IBusiness> = mongoose.model(
  "Business",
  businessSchema,
);
