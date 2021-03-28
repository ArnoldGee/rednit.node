import { Sector } from "../Sector.ts";
import { ProfileBasic } from './Profile.ts';

export interface Business extends ProfileBasic {
  _id: string;
  profileType: "BUSINESS"
  name: string;
  sectors: Sector[];
  jobs: string[]
}