import { Applicant } from "./../model/profile/Applicant";
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

    const business = await Business.findByIdAndUpdate(user?.businessProfile, {
      "$push": { jobs: savedJob._id },
    });

    res.status(200).json({
      msg: `Job ${job.name} was added to database`,
      job: savedJob,
      business,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

jobRouter.put("/", auth, async (req, res) => {
  try {
    const { _userId, _id, ...job }:
      & Omit<
        IJob,
        | "business"
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

    const newJob = await Job.findByIdAndUpdate(_id, job, { new: true });

    res.status(200).json({
      msg: `Job ${job.name} was added to database`,
      job: newJob,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

jobRouter.delete("/", auth, async (req, res) => {
  const { id }: { id: string } = req.body;

  const job = await Job.findByIdAndDelete(id);

  if (job) {
    res.status(200).json({
      msg: `Job ${job.name} was successfully deleted`,
      job,
    });
  }

  res.status(400).json(
    {
      msg:
        `Job deletion failed: no job with id ${id} was registered in our database.`,
    },
  );
});

export default jobRouter;
