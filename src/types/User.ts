export interface IUser {
  _id: any;
  name: string;
  email: string;
  password: string;
  created: Date;
  isPremium: boolean;
  img?: string;
  applicantProfile?: string;
  businessProfile?: string;
}
