import { Request, Response } from "express";
// import bcrypt from 'bcryptjs'
import User, { IUser } from "../models/user.module";
import mongoose from "mongoose";


// registering a user

export const registerUser = async (req: Request, res: Response) => {
  console.log("Req.body is :", req.body);
    const {name ,email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: IUser = new User({
        name,
        email,
        password,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};

// getUser by id


export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; // Extract user ID from request parameters
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await User.findById(userId); // Query database for user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // If user not found, return 404
    }

    return res.status(200).json(user); // Return user data in response
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' }); // If error occurs, return 500
  }
};

// getUserByName

export const getUserByName = async (req: Request, res: Response) => {
  try {
    const username = req.params.name; // Extract user ID from request parameters
    // if (!mongoose.Types.ObjectId.isValid(name)) {
    //   return res.status(400).json({ message: 'Invalid user name' });
    // }
    const user = await User.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ message: 'User not founddddd' }); // If user not found, return 404
    }

    return res.status(200).json(user); // Return user data in response
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' }); // If error occurs, return 500
  }
};

// get all users

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()

    if (!users) {
      return res.status(404).json({ message: 'User not found' }); // If user not found, return 404
    }

    return res.status(200).json(users); // Return user data in response
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' }); // If error occurs, return 500
  }
};
  
export const deleteAllUsers = async (req: Request, res: Response) => {
  try{
    const result = await User.deleteMany({});
    return res.status(200).json({message : 'All users are deleted', result})
  }catch(error){
    console.log('error', error);
    return res.status(500).json({ message: 'Server error', error });
  }
}

export const deleteUserByName = async (req : Request, res : Response) => {
  try
  {
    const username = req.params.name
    const deleted_user = await User.findOneAndDelete({ name: username });
    if (!deleted_user) {
      return res.status(400).json({ message: 'User not found with the name: ' + username });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  }catch(error){
    console.log('error', error);
    return res.status(500).json({ message: 'Server error', error });
  }
}

