import { createJwt } from "./../util/jwt";
import { Router } from "express";
import { IUser, User } from "../model/profile/User";
import bcrypt from "bcrypt";
import { auth } from "../middleware/auth";

const userRouter = Router();

// User registration
userRouter.post("/", async (req, res) => {
  try {
    // get data from request body
    const registrationData: Pick<IUser, "name" | "email" | "password"> =
      req.body;
    const { email, password, name } = registrationData;

    // check if the request is complete
    if (!email || !password || !name) {
      return res.status(400).json({
        msg: "Not all fields have been received",
      });
    }

    // Check if user doesn't already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: `User with email ${email} already exists`, existingUser });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Add user to database
    const newUser = new User({ name, password: passwordHash, email });
    const savedUser = await newUser.save();

    // Inform client that user has been saved successfully
    res
      .status(200)
      .json({
        msg: `User ${name} with email ${email} was added to database`,
        savedUser,
      });

    // IMPORTANT: After registration, client must make a call to the user login route, in order to receive the jwt token.
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

// User login
userRouter.get("/", async (req, res) => {
  try {
    const loginData: Pick<IUser, "email" | "password"> = req.body;
    const { email, password } = loginData;

    // check if you've actually received the data
    if (!email || !password) {
      return res.status(400).json({
        msg: "not all fields have been received",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: `User with email ${email} doesn't exist` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: `Incorrect password for user ${user.name}` });
    }

    const token = createJwt(user._id);

    res.status(200).send({
      msg: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

// User
userRouter.put("/", auth, async (req, res) => {
  try {
    const { name, email, img } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        msg: "not all fields have been received",
      });
    }

    const previousUser = await User.findByIdAndUpdate(req.body._userId, {
      name,
      email,
      img,
    });

    if (!previousUser) {
      res.status(400).json({
        msg:
          `No user with id ${req.body._userId} was registered in our database, so no user was updated.`,
      });
    }

    const user = await User.findById(req.body._userId);

    res.status(200).send({
      msg: `User ${name} updated`,
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

userRouter.delete("/", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body._userId);
    if (!user) {
      res.status(400).json({
        msg:
          `No user with id ${req.body._userId} was registered in our database, so no user was deleted.`,
      });
    }

    res.status(200).json({
      msg: `User ${user?.name} successfully deleted`,
      user,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error: " + err.message });
  }
});

// TODO: route to create a new password

export default userRouter;
