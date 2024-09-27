import { check } from "express-validator";
import { validateResult } from "./validateHelper.js";

export const validateCreateProduct = [
  check("title")
    .exists()
    .withMessage("Title is required")
    .not()
    .isEmpty()
    .withMessage("Title cannot be empty"),
  check("description")
    .exists()
    .withMessage("Description is required")
    .not()
    .isEmpty()
    .withMessage("Description cannot be empty"),
  check("code")
    .exists()
    .withMessage("Code is required")
    .not()
    .isEmpty()
    .withMessage("Code cannot be empty"),
  check("price")
    .exists()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  check("stock")
    .exists()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a number"),
  check("category")
    .exists()
    .withMessage("Category is required")
    .not()
    .isEmpty()
    .withMessage("Category cannot be empty"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
