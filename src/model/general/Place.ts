import { Schema } from "mongoose";

export interface Place {
  city?: string;
  country?: string;
}

export const placeSchema = new Schema({
  city: String,
  country: String,
})