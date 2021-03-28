import { Router } from 'express';
import { User } from '../model/User';
import { IUser } from '../types/User';
import bcrypt from 'bcrypt'


const userRouter = Router();

// User registration
userRouter.post('/', async (req, res) => {
  try {
    const loginData: Pick<IUser, 'name' | 'email' | 'password'> = req.body
    const {email, password, name} = loginData
    
    if (!email || !password || !name) {
      return res.status(400).json({
        msg: 'Not all fields have been received',
      });
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({msg: `User with email ${email} already exists`, existingUser});
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({name, password: passwordHash, email });
    const savedUser = await newUser.save();
    res
      .status(200)
      .json({msg: `User ${name} with email ${email} was added to database`, savedUser});
  } catch(err) {
    res.status(500).json({msg: 'Internal server error: ' + err.message});
  }
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