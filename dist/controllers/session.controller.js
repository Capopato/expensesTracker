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
exports.logout = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const config_1 = __importDefault(require("../config/config"));
const session_middleware_1 = require("../middleware/session/session.middleware");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const user = yield user_model_1.default.find({ username: input.username });
    if (!user) {
        return res.status(404).send("User not found.");
    }
    const userId = user.map((data) => data.id).toString();
    if (!userId) {
        return;
    }
    const session = yield (0, session_middleware_1.createSession)(userId);
    const accessToken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session.id }), config_1.default.accessTokenLT);
    const refreshToken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session.id }), config_1.default.refreshTokenLT);
    res.cookie("accessToken", accessToken, {
        maxAge: 30000,
        httpOnly: true,
    });
    //   res.locals.user = user;
    //   console.log(res.locals.user);
    return res.send({ accessToken, refreshToken });
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.logout = logout;
