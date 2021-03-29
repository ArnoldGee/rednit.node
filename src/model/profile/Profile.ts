import { Document } from 'mongoose';
import { Review } from "../experience/Review";
import { Img } from '../general/Img';
import { Place } from "../general/Place";
import { Sector } from '../Sector';
import { IApplicant } from "./Applicant";
import { IBusiness } from "./Business";

export interface ProfileBasic extends Document {
  _id: string;
  user: string;
  profileType: "APPLICANT" | "BUSINESS";
  place?: Place;
  shortDescription?: string;
  description?: string;
  imgs: Img[];
  sectors: Sector[];
  reviews: Review[];
}

export type Profile = IApplicant | IBusiness