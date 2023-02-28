import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import { get } from "lodash"; // Use the function to get a property when it is uncertain if the property exists.

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = "";
  let refreshToken = "";

  const token = req.headers.cookie;

  if (!token) {
    return next();
  }

  if (token.includes("accessToken")) {
    const { decoded, expired } = verifyJWT(accessToken);
  }

  if (token.includes("refreshToken")) {
    refreshToken = token.substring(13).toString();
    // console.log(refreshToken);
    const { valid, decoded, expired } = verifyJWT(refreshToken);
    console.log(valid);
    console.log(decoded);
    console.log(expired);
  }
  next();
};
