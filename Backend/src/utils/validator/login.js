import { check } from "express-validator";
import { validateResult } from "./validateHelper.js";

export const validateCreateLogin = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty"),
  check("password")
    .exists()
    .withMessage("Password is required")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
