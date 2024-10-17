import { check } from "express-validator";
import { validateResult } from "./validateHelper.js";
import { validatePhoneNumber } from "../validatePhone.js";

export const validateUpdateUserCurrent = [
  check("name", "Name is required")
    .optional()
    .isString("Name muest be of type String"),
  check("last_name", "Surname is required")
    .optional()

    .isString("Last name muest be of type Number"),
  check("phone", "Phone is required")
    .optional()
    .isNumeric(),
  check("country", "Country is required")
    .optional()
    .isString("Country muest be of type String"),
  check("postal_code", "Postal muest be of type Number")
    .optional()
    .isNumeric(),
  check("locality", "locality muest be of type String")
    .optional()
    .isString(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]
