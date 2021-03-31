import { IUser } from './User';
import { Document } from 'mongoose';
import { Review } from "../experience/Review";
import { Img } from '../general/Img';
import { Place } from "../general/Place";
import { Sector } from '../constants/Sector';
import { IApplicant } from "./Applicant";
import { IBusiness } from "./Business";

export interface ProfileBasic extends Document {
  _id: string;
  slug: string;
  user: string | IUser;
  profileType: "APPLICANT" | "BUSINESS";
  place?: Place;
  shortDescription?: string;
  description?: string;
  imgs: Img[];
  sectors: Sector[];
  reviews: Review[];
}

export type Profile = IApplicant | IBusiness