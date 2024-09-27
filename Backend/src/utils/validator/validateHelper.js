import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = new Set(errors.array().map((err) => err.msg));
    return res
      .status(400)
      .json({
        succes: false,
        message: "field(s) incompleted",
        errors: Array.from(errorMessages),
      });
  }
  next();
};
