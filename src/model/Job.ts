import { EmploymentType } from "./EmploymentType.ts";
import { Place } from "./general/Place.ts";
import { Img } from "./general/Img.ts";
export interface Job {
  _id: string;
  business: string;
  name: string;
  description?: string;
  place: Place;
  sector: string;
  creationDate: string;
  deadlineDate?: string;
  requirements?: string;
  yearsExperience?: number;
  employmentType?: EmploymentType;
  isRemote: boolean;
  skills: string[];
  imgs: Img[];
  website?: string;
}
