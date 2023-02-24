import express from "express";
import { createUser, deleteAllUsers, deleteUser, readAllUsers, readUser, updateUser } from "../controllers/user.controller";
import { validateUser } from "../middleware/validateUser.middleware";

const userRouter = express.Router();

userRouter.post("/create", validateUser, createUser);
userRouter.put("/update/:userId", validateUser, updateUser);
userRouter.get("/read/:userId", readUser);
userRouter.get("/read-all", readAllUsers);
userRouter.delete("/delete/:userId", deleteUser);
userRouter.delete("/delete-all", deleteAllUsers);

export default userRouter;
