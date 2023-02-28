import dotenv from "dotenv";

dotenv.config();

const mongoUsername = process.env.mongoUsername || "";
const mongoPassword = process.env.mongoPassword || "";
const mongoUrl = process.env.mongoUrl || "";
const port = process.env.port || 3001;
const accessTokenLT = process.env.accessTokenLT || "";
const refreshTokenLT = process.env.refreshTokenLT || "";
const publicKey = process.env.publicKey || "";
const privateKey = process.env.privateKey || "";

export default {
  mongoUsername,
  mongoPassword,
  mongoUrl,
  port,
  accessTokenLT,
  refreshTokenLT,
  publicKey,
  privateKey,
};
