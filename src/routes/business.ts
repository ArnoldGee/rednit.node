import { User } from "../model/profile/User";
import { Router } from "express";
import { auth } from "../middleware/auth";
import { Business, IBusiness } from "../model/profile/Business";

const businessRouter = Router();

/**
 * This request needs to pass a JSON object with all the user data.
 */
businessRouter.post("/", auth, async (req, res) => {
  try {
    const { _userId, ...business }:
      & Omit<
        IBusiness,
        "_id" | "slug" | "user" | "profileType"
      >
      & { _userId: string } = req.body;

    if (!business.name) {
      return res.status(400).json({
        msg: "Business name is missing",
      });
    }

    const existingBusiness = await Business.findOne({ user: _userId });
    if (existingBusiness) {
      return res
        .status(400)
        .json({
          msg: `Business with that user already exists`,
          business: existingBusiness,
        });
    }

    const newBusiness = new Business({
      ...business,
      slug: business.name.toLowerCase(),
      user: _userId,
    });
    const savedBusiness = await newBusiness.save();

    const user = await User.findByIdAndUpdate(req.body._userId, {
      businessProfile: savedBusiness._id,
    }, { new: true });

    res.status(200).json({
      msg: `Business ${business.name} was added to database`,
      business: savedBusiness,
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

businessRouter.get("/", auth, async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.body._userId }).populate("jobs");

    if (business) {
      res.status(200).json({
        msg: `Business ${business.name} successfully retrieved`,
        business,
      });
    }

    res.status(400).json({
      msg:
        `Business retrieval failed: no business from user ${req.body._userId} was registered in our database.`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

businessRouter.get("/slug/:slug", async (req, res) => {
  try {
    const business = await Business.findOne({ slug: req.params.slug }).populate("jobs");

    if (business) {
      res.status(200).json({
        msg: `Business ${business.name} successfully retrieved`,
        applicant: business,
      });
    }

    res.status(400).json({
      msg:
        `Business retrieval failed: no business with slug ${req.params.slug} was registered in our database.`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

businessRouter.put("/", auth, async (req, res) => {
  try {
    const { _userId, ...business }:
      & Omit<
        IBusiness,
        "_id" | "slug" | "user" | "profileType"
      >
      & { _userId: string } = req.body;

    const previousBusiness = await Business.findOneAndUpdate({
      user: req.body._userId,
    }, business);

    if (previousBusiness) {
      res.status(200).json({
        msg: `Business ${business.name} successfully updated`,
        business: previousBusiness,
      });
    }

    res.status(400).json({
      msg:
        `Business update failed: no business from user ${req.body._userId} was registered in our database.`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

businessRouter.delete("/", auth, async (req, res) => {
  try {
    const business = await Business.findOneAndDelete({
      user: req.body._userId,
    });

    if (!business) {
      res.status(400).json(
        {
          msg:
            `Business deletion failed: no business from user ${req.body._userId} was registered in our database.`,
        },
      );
    }

    res.status(200).json({
      msg: `Business ${business?.name} was deleted from the database`,
      applicant: business,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

export default businessRouter;
