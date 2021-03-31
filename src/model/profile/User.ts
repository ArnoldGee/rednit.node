import { IApplicant } from './Applicant';
import { IBusiness } from './Business';
import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  created: Date;
  isPremium: boolean;
  img?: string;
  applicantProfile?: string | IApplicant;
  businessProfile?: string | IBusiness;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, required: true, default: true },
  created: { type: Date, required: true, default: Date.now },
  img: String,
  applicantProfile: { type: Schema.Types.ObjectId, ref: 'Applicant' }, 
  businessProfile: { type: Schema.Types.ObjectId, ref: 'Business' }, 
});

export const User: Model<IUser> = mongoose.model("User", userSchema);
