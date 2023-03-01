"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUser = exports.readAllUsers = exports.readUser = exports.updateUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordCheck = req.body.passwordCheck;
    const user = new user_model_1.default({
        id: new mongoose_1.default.Types.ObjectId(),
        username,
        email,
        password,
        passwordCheck,
    });
    try {
        yield user.save();
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const update = req.body;
    try {
        const user = yield user_model_1.default.findByIdAndUpdate(id);
        if (user) {
            user.set(update);
            user.save();
            res.status(200).json({ user });
        }
        else {
            res.status(404).send("User not found.");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.updateUser = updateUser;
const readUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            res.status(404).send("User not found.");
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.readUser = readUser;
const readAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all = yield user_model_1.default.find();
        res.status(200).json({ all });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.readAllUsers = readAllUsers;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    try {
        const user = yield user_model_1.default.findByIdAndDelete(id);
        if (!user) {
            res.status(404).send("User not found.");
            return;
        }
        res.status(200).send(`User is deleted.`);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.deleteUser = deleteUser;
const deleteAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAll = yield user_model_1.default.deleteMany();
        res.status(200).send("All users are deleted.");
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.deleteAllUsers = deleteAllUsers;
