import { Document } from 'mongoose';
import { Img } from '../general/Img';
import { Place } from "../general/Place";
import { Review } from "../experience/Review";
import { IApplicant } from "./Applicant";
import { IBusiness } from "./Business";
import { Sector } from '../Sector';

export interface ProfileBasic extends Document {
  _id: string;
  profileType: "APPLICANT" | "BUSINESS";
  place?: Place;
  shortDescription?: string;
  description?: string;
  imgs: Img[];
  sectors: Sector[];
  reviews: Review[];
}

export type Profile = IApplicant | IBusiness