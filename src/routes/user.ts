import { Router } from 'express';
import { User, IUser } from '../model/User';
import bcrypt from 'bcrypt'


const userRouter = Router();

// User registration
userRouter.post('/', async (req, res) => {
  try {
    // get data from request body
    const loginData: Pick<IUser, 'name' | 'email' | 'password'> = req.body
    const {email, password, name} = loginData
    
    // check if the request is complete
    if (!email || !password || !name) {
      return res.status(400).json({
        msg: 'Not all fields have been received',
      });
    }

    // Check if user doesn't already exist
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({msg: `User with email ${email} already exists`, existingUser});
    }

    // Encrypt password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Add user to database
    const newUser = new User({name, password: passwordHash, email });
    const savedUser = await newUser.save();

    // Inform client that user has been saved successfully
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