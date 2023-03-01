import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";
import Session from "../../models/session.model";

export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.find(req.body.username);
  const userId = user.map((data) => data.id);

  const sessions = await Session.find({ user: userId });
  const isActive = sessions.map((data) => data.valid);

  if (!isActive) {
    return res.sendStatus(403);
  }

  return next();
};
