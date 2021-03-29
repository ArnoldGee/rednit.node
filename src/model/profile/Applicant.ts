import mongoose, { Model, Schema } from "mongoose";
import { EmploymentType } from "../EmploymentType";
import { Education, educationSchema } from "../experience/Education";
import { reviewSchema } from "../experience/Review";
import {
  WorkExperience,
  workExperienceSchema
} from "../experience/WorkExperience";
import { placeSchema } from "../general/Place";
import { imgSchema } from "./../general/Img";
import { ProfileBasic } from "./Profile";

export interface IApplicant extends ProfileBasic {
  profileType: "APPLICANT";
  firstName: string;
  surname?: string;
  education: Education[];
  WorkExperiences: WorkExperience[];
  employmentTypes: EmploymentType[];
  skills: string[];
  selectedJobs: string[];
}

const applicantSchema = new Schema({
  user: String,
  profileType: { type: String, required: true },
  place: placeSchema,
  shortDescription: String,
  description: String,
  imgs: [imgSchema],
  sectors: [String],
  reviews: [reviewSchema],

  firstName: { type: String, required: true },
  surname: String,
  education: [educationSchema],
  workExperiences: [workExperienceSchema],
  employmentTypes: [String],
  skills: [String],
  selectedJobs: [String], // change by populate
});

export const Applicant: Model<IApplicant> = mongoose.model(
  "Applicant",
  applicantSchema,
);
