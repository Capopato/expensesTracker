import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    validateUserSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const err = error.issues;
      res.status(500).json({ err });
      return;
    }
    res.status(500).json({ error });
  }
};

const validateUserSchema = z.object({
  username: z.string().min(3).max(25),
  email: z.string().email(),
  password: z.string().min(3).max(50),
  passwordCheck: z.string(),
});

export type validateUserSchema = z.infer<typeof validateUserSchema>;
