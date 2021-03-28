export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isPremium: boolean;
  img?: string;
  applicantProfile?: string;
  businessProfile?: string;
}
