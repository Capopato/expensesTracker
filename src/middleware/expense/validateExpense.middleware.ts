import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";
import config from "../../config/config";

export const validateExpense = (req: Request, res: Response, next: NextFunction) => {
  try {
    validateExpenseSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const err = error.issues;
      console.log(err);
      res.status(500).json({ err });
      return;
    }
    console.log(error);

    res.status(500).json({ error });
  }
};

const validateExpenseSchema = z.object({
  user: z.string().refine(async (val) => await User.find({ username: val })),
  title: z.string().min(1).max(25),
  amount: z.number().min(0),
  currency: z.string().refine((val) => Object.values(config.currencies).includes(val), { message: "Currency not found." }),
  description: z.string().min(0).max(150),
});

export type validateExpenseSchema = z.infer<typeof validateExpenseSchema>;
