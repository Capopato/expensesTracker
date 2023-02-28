import jwt from "jsonwebtoken";
import config from "../config/config";

export const signJWT = (payload: object, expiresIn: string) => {
  return jwt.sign(payload, config.privateKey, {
    algorithm: "RS256",
    expiresIn,
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.publicKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  }
};
