import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordCheck = req.body.passwordCheck;

  const user = new User({
    id: new mongoose.Types.ObjectId(),
    username,
    email,
    password,
    passwordCheck,
  });

  try {
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  const update = req.body;

  try {
    const user = await User.findByIdAndUpdate(id);
    if (user) {
      user.set(update);
      user.save();
      res.status(200).json({ user });
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const readUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await User.find();
    res.status(200).json({ all });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    res.status(200).send(`User is deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const deleteAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteAll = await User.deleteMany();
    res.status(200).send("All users are deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
