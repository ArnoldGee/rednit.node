import jwt from "jsonwebtoken";

export const createJwt = (id: any): string =>
  jwt.sign({ id }, process.env.JWT_SECRET as string);

export const validateJwt = (token: string): { id: any } =>
  jwt.verify(token, process.env.JWT_SECRET as string) as { id: any };
