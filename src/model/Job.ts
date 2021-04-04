import { Sector } from "./constants/Sector";
import { EmploymentType } from "./constants/EmploymentType";
import { Place, placeSchema } from "./general/Place";
import { Img, imgSchema } from "./general/Img";
import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IBusiness } from "./profile/Business";
import { IApplicant } from "./profile/Applicant";

export interface IJob extends Document {
  _id: string;
  business: string | IBusiness;
  name: string;
  description?: string;
  isActive: boolean;
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
  selectedApplicants: string[] | IApplicant[];
  matchedApplicants: string[] | IApplicant[];
}

const jobSchema = new Schema({
  business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
  name: { type: String, required: true },
  description: String,
  isActive: { type: Boolean, required: true, default: true },
  place: placeSchema,
  sector: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  deadlineDate: String,
  requirements: String,
  yearsExperience: String,
  employmentType: String,
  isRemote: Boolean,
  skills: [String],
  imgs: [imgSchema],
  website: String,
  selectedApplicants: [{ type: Schema.Types.ObjectId, ref: "Applicant" }],
  matchedApplicants: [{ type: Schema.Types.ObjectId, ref: "Applicant" }],
});

export const Job: Model<IJob> = mongoose.model("Job", jobSchema);
