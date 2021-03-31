import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "../profile/User";

export interface Review {
  reviewer: string | IUser;
  user: string | IUser;
  title: string;
  body: string;
}

export const reviewSchema = new Schema({
  reviewer: { type: Schema.Types.ObjectId, ref: "User" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  body: { type: String, required: true },
});
