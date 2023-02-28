import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { signJWT } from "../utils/jwt.utils";
import config from "../config/config";
import { createSession } from "../middleware/session.middleware";
import { deserializeUser } from "../middleware/deserializeUser.middleware";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const input = req.body;
  const user = await User.find({ username: input.username });

  if (!user) {
    return res.status(404).send("User not found.");
  }
  const userId: string = user.map((data) => data.id).toString();

  if (!userId) {
    return;
  }

  const session = await createSession(userId);
  const accessToken = signJWT({ ...user, session: session.id }, config.accessTokenLT);
  const refreshToken = signJWT({ ...user, session: session.id }, config.refreshTokenLT);

  res.cookie("accessToken", accessToken, {
    maxAge: 30000,
    httpOnly: true,
  });

  //   res.locals.user = user;
  //   console.log(res.locals.user);
  return res.send({ accessToken, refreshToken });
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {};
