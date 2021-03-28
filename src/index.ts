import express from 'express'
import {config as dotenvConfig} from 'dotenv'
import userRouter from './routes/user';

dotenvConfig();

console.log(process.env.MONGO_URI)

const app = express();

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send("Welcome to the Ultra 85 Rednit program")
})


app.listen(8080, () => {
  console.log("Server running")
})