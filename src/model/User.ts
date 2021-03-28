import mongoose, { Model, Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  created: Date;
  isPremium: boolean;
  img?: string;
  applicantProfile?: string;
  businessProfile?: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, required: true, default: true },
  created: { type: Date, required: true, default: Date.now },
  img: String,
  applicantProfile: String, // TODO: REPLACE WITH OBJECT ID or subdocument
  businessProfile: String, // TODO: REPLACE WITH OBJECT ID or subdocument
});

export const User: Model<IUser> = mongoose.model("User", userSchema);
