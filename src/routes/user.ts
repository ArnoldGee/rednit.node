import express, { Router } from 'express';

const userRouter = Router();

// User registration
userRouter.post('/', (req, res) => {
  res.send("User post")
})

// User login
userRouter.get('/', (req, res) => {
  res.send("User get")
})

// User 
userRouter.put('/', (req, res) => {
  res.send("User update")
})

userRouter.delete('/', (req, res) => {
  res.send("User delete")
})

export default userRouter;