import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateExpense = (req: Request, res: Response, next: NextFunction) => {
  try {
    validateExpenseSchema.parse(req.body);
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

const validateExpenseSchema = z.object({
  title: z.string().min(1).max(25),
  amount: z.number().min(0),
  description: z.string().min(0).max(150),
});

export type validateExpenseSchema = z.infer<typeof validateExpenseSchema>;
