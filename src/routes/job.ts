import { Business } from "./../model/profile/Business";
import { User } from "./../model/profile/User";
import { Router } from "express";
import { auth } from "../middleware/auth";
import { IJob, Job } from "../model/Job";

const jobRouter = Router();

jobRouter.post("/", auth, async (req, res) => {
  try {
    const { _userId, ...job }:
      & Omit<
        IJob,
        | "_id"
        | "business"
        | "isActive"
        | "creationDate"
        | "selectedApplicants"
        | "matchedApplicants"
      >
      & { _userId: string } = req.body;

    const { name, place, sector, isRemote } = job;
    if (!(name && place && sector && isRemote)) {
      return res.status(400).json({
        msg: "Required properties are missing: name, place, sector, isRemote",
      });
    }

    const user = await User.findById(_userId);

    const newJob = new Job({
      business: user?.businessProfile,
      ...job,
    });
    const savedJob = await newJob.save();
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

export default jobRouter;
