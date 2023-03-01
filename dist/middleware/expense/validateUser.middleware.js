"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
const validateUser = (req, res, next) => {
    try {
        validateUserSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const err = error.issues;
            res.status(500).json({ err });
            return;
        }
        res.status(500).json({ error });
    }
};
exports.validateUser = validateUser;
const validateUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(25),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3).max(50),
    passwordCheck: zod_1.z.string(),
});
