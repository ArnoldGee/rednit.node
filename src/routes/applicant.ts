import { Router } from "express";
import { auth } from "../middleware/auth";
import { Applicant, IApplicant } from "../model/profile/Applicant";

const applicantRouter = Router();

/**
 * This request needs to pass a JSON object with all the user data.
 */
applicantRouter.post("/", auth, async (req, res) => {
  try {
    const { _userId, ...applicant }:
      & Omit<
        IApplicant,
        "_id" | "slug" | "user" | "profileType" | "selectedJobs" | "matchedJobs"
      >
      & { _userId: string } = req.body;

    if (!applicant.firstName) {
      return res.status(400).json({
        msg: "Applicant name is missing",
      });
    }

    const existingApplicant = await Applicant.findOne({ user: _userId });
    if (existingApplicant) {
      return res
        .status(400)
        .json({
          msg: `Applicant with that user already exists`,
          existingApplicant,
        });
    }

    const newApplicant = new Applicant({
      ...applicant,
      slug: applicant.firstName.toLowerCase() + "-" +
        applicant.surname?.toLowerCase(),
      user: _userId,
    });
    const savedApplicant = await newApplicant.save();

    res.status(200).json({
      msg: `Applicant ${applicant.firstName} ${applicant.surname} was added to database`,
      savedApplicant
    })
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

applicantRouter.get("/", auth, (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

applicantRouter.get("/slug", (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

applicantRouter.put("/", auth, (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

applicantRouter.delete("/", auth, (req, res) => {
  try {
    

  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

export default applicantRouter;
