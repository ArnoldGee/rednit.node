import { Applicant, IApplicant } from "./../model/profile/Applicant";
import { Business } from "./../model/profile/Business";
import { IUser, User } from "./../model/profile/User";
import { Router } from "express";
import { auth } from "../middleware/auth";
import { IJob, Job } from "../model/Job";
import userRouter from "./user";
import { readSync } from "node:fs";

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

jobRouter.get("/", async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId).populate("matchedApplicants");

    if (job) {
      return res.status(200).json({
        msg: `Job ${job.name} successfully retrieved`,
        job,
      });
    }
    res.status(400).json({
      msg: `Could not find job with id ${jobId}`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

jobRouter.get("/list", auth, async (req, res) => {
  try {
    const { _userId } = req.body;
    const user = await User.findById(_userId).populate("applicantProfile");

    if (!user) {
      return res.status(400).json({
        msg: `Could not find user with id ${_userId}`,
      });
    }

    const applicantProfile: IApplicant = user.applicantProfile as IApplicant;

    let jobs: IJob[];

    if (applicantProfile.sectors.length) {
      jobs = await Job.find({
        sector: { $in: applicantProfile.sectors },
      }).sort({ creationDate: -1 }).limit(10);
    } else {
      jobs = await Job.find().sort({ creationDate: -1 }).limit(10);
    }

    res.status(200).json({
      msg: "Here are some jobs for you",
      jobs: jobs,
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

jobRouter.patch("/select-applicant", auth, async (req, res) => {
  try {
    const { applicantId, jobId } = req.body; // The id of the applicant

    const job = await Job.findById(jobId);
    const applicant = await Applicant.findById(applicantId);
    const selectedJobs: string[] = applicant?.selectedJobs as string[];

    if (selectedJobs.find((id: string) => id === jobId)) {
      await job?.update({
        $push: { matchedApplicants: applicant?._id },
      });

      await applicant?.update({
        $push: { matchedJobs: job?._id },
      });

      res.status(200).json({
        msg: "It's a match!",
        isMatch: true,
      });
    } else {
      await job?.update({
        $push: { selectedApplicants: applicant?._id },
      });

      res.status(200).json({
        msg: "Selected applicant added to list",
        isMatch: false,
      });
    }
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
