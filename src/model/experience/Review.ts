import mongoose, { Document, Schema, Model } from "mongoose";

export interface Review {
  reviewer: string;
  user: string;
  title: string;
  body: string;
}

export const reviewSchema = new Schema({
  reviewer: { type: String, required: true },
  user: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});
