import { Place } from "../Place.ts";

export interface Experience {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  place?: Place;
  link?: string;
}