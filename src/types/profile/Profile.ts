import { Img } from '../general/Img.ts';
import { Place } from "../general/Place.ts";
import { Review } from "../experience/Review.ts";
import { Applicant } from "./Applicant.ts";
import { Business } from "./Business.ts";

export interface ProfileBasic {
  _id: string;
  profileType: "APPLICANT" | "BUSINESS";
  place: Place;
  shortDescription?: string;
  description?: string;
  imgs: Img[];
  reviews: Review[];
}

export type Profile = Applicant | Business