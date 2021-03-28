import { EmploymentType } from '../EmploymentType.ts';
import { Sector } from '../Sector.ts';
import { WorkExperience } from "../experience/WorkExperience.ts";
import { Education } from "../experience/Education.ts";
import { ProfileBasic } from "./Profile.ts";

export interface Applicant extends ProfileBasic {
  profileType: "APPLICANT";
  firstName: string;
  surname: string;
  education: Education[];
  WorkExperiences: WorkExperience[];
  employmentTypes: EmploymentType[]
  sectors: Sector[]
  skills: string[];
}
