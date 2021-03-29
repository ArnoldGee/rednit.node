import { Place } from "../general/Place";

export interface Experience {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  place?: Place;
  link?: string;
}