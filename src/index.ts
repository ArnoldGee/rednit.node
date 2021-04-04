import express from "express";
import { config as dotenvConfig } from "dotenv";
import userRouter from "./routes/user";
import cors from "cors";
import mongoose from "mongoose";
import constantsRouter from "./routes/constants";
import businessRouter from "./routes/business";
import applicantRouter from "./routes/applicant";
import jobRouter from "./routes/job";

dotenvConfig();

// Connect to database
mongoose.connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connection successful");
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRouter);
app.use("/business", businessRouter);
app.use("/applicant", applicantRouter);
app.use("/job", jobRouter);
app.use("/constants", constantsRouter);

// Server test
app.get("/", (req, res) => {
  res.send("Welcome to the Ultra 85 Rednit program");
  console.log(req.body);
});

// Spin up server and make it listen on port
app.listen(8080, () => {
  console.log("Server running");
});
