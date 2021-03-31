import { employmentTypes } from './../constants/employmentTypes';
import { Sector } from './constants/Sector';
import { EmploymentType } from "./constants/EmploymentType";
import { Place, placeSchema } from "./general/Place";
import { Img, imgSchema } from "./general/Img";
import mongoose, { Document, Model } from "mongoose";

export interface IJob extends Document {
  _id: string;
  business: string;
  name: string;
  description?: string;
  place: Place;
  sector: Sector;
  creationDate: Date;
  deadlineDate?: string;
  requirements?: string;
  yearsExperience?: number;
  employmentType?: EmploymentType;
  isRemote: boolean;
  skills: string[];
  imgs: Img[];
  website?: string;
  selectedApplicants: string[]
  matchedApplicants: string[]
}

const jobSchema = new mongoose.Schema({
  business: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  place: placeSchema,
  sector: { type: String, required: true },
  creationDate: { type: Date, required: true},
  deadlineDate: String,
  requirements: String,
  yearsExperience: String,
  employmentType: String,
  isRemote: Boolean,
  skills: [String],
  imgs: [imgSchema],
  website: String,
  selectedApplicants: [String],
  matchedApplicants: [String],
});

export const Job: Model<IJob> = mongoose.model("Job", jobSchema);