import dotenv from "dotenv";

dotenv.config();

const mongoUsername = process.env.mongoUsername || "";
const mongoPassword = process.env.mongoPassword || "";
const mongoUrl = process.env.mongoUrl || "";
const port = process.env.port || 3001;

export default {
  mongoUsername,
  mongoPassword,
  mongoUrl,
  port,
};
