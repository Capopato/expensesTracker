"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validateUser_middleware_1 = require("../middleware/expense/validateUser.middleware");
const requireUser_middleware_1 = require("../middleware/session/requireUser.middleware");
const userRouter = express_1.default.Router();
userRouter.post("/create", validateUser_middleware_1.validateUser, user_controller_1.createUser);
userRouter.put("/update/:userId", validateUser_middleware_1.validateUser, user_controller_1.updateUser);
userRouter.get("/read/:userId", user_controller_1.readUser);
userRouter.get("/read-all", user_controller_1.readAllUsers);
userRouter.delete("/delete/:userId", requireUser_middleware_1.requireUser, user_controller_1.deleteUser);
userRouter.delete("/delete-all", user_controller_1.deleteAllUsers);
exports.default = userRouter;
