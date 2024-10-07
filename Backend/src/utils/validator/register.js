import { check } from "express-validator";
import { validateResult } from "./validateHelper.js";

export const validateCreateRegister = [
  check("name")
    .exists()
    .withMessage("First_name is required")
    .not()
    .isEmpty()
    .withMessage("First_name cannot be empty")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First_name cannot contain numbers or special characters"),
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
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
