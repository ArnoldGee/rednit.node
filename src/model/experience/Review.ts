import { Schema } from "mongoose";

export interface Review {
  user: string;
  title: string;
  body: string;
}

export const reviewSchema = new Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});
