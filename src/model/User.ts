import mongoose from "mongoose";

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

export const User = mongoose.model("User", userSchema);
