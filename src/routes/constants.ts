import { employmentTypes } from "./../constants/employmentTypes";
import { Router } from "express";
import { sectors } from "../constants/sectors";

const constantsRouter = Router();

constantsRouter.get("/employment-types", (req, res) => {
  res.json(employmentTypes);
});

constantsRouter.get("/sectors", (req, res) => {
  res.json(sectors);
});

export default constantsRouter;
