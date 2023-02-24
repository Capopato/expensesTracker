/**
 * Expense tracker.
 * Expense need extra value: username. It is assigned to this user (and when check it needs to be cross checked with the mongoDB to see if the user exists)
 * make a function to view all the expenses assigned to a user.
 * make a user model/schema for mongoDB. Because each user can make multiple expenses and categorizing them in different categories
 *
 * IDEA:
 * make optional to convert the expense to another currency
 */

import express, { urlencoded } from "express";
import mongoose from "mongoose";
import config from "./config/config";
import userRouter from "./routes/user.routes";
import expenseRoutes from "./routes/expense.routes";

const app = express();

/** Set connection to mongoDB */
mongoose
  .set("strictQuery", true)
  .connect(config.mongoUrl)
  .then(() => {
    console.log("Connected to mongoDB");
    startServer();
  })
  .catch((error) => {
    console.log(error);
  });

/** This function will only be activated when connection to mongoDB has been realised */
const startServer = () => {
  app.use(express.json());
  app.use(urlencoded({ extended: true }));
  app.use("/user", userRouter);
  app.use("/expense", expenseRoutes);

  app.listen(config.port, () => console.log(`Port is running at: ${config.port}`));
};
