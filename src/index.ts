import express from 'express'
import {config as dotenvConfig} from 'dotenv'
import userRouter from './routes/user';
import cors from 'cors';
import mongoose from "mongoose";

dotenvConfig();

mongoose.connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connection successful")
});

console.log(process.env.MONGO_URI)

const app = express();

app.use(express.json())
app.use(cors());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send("Welcome to the Ultra 85 Rednit program")
  console.log(req.body)
})


app.listen(8080, () => {
  console.log("Server running")
})