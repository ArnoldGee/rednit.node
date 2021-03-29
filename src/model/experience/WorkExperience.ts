import { Schema } from 'mongoose';
import { placeSchema } from '../general/Place';
import { Experience } from './Experience';

export interface WorkExperience extends Experience {
  company: string;
  companyId?: string;
}

export const workExperienceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  place: placeSchema,
  link: String,

  company: { type: String, required: true },
  companyId: String
});

