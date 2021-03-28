import jwt from "jsonwebtoken";

export const createJwt = (id: any): string =>
  jwt.sign({ id }, process.env.JWT_SECRET as string);
