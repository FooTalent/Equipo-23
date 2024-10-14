import { check } from "express-validator";
import { validateResult } from "./validateHelper.js";
import { validatePhoneNumber } from "../validatePhone.js";

export const validateUpdateUserCurrent = [
  check("name", "Name is required")
    .optional()
    .isString("Name muest be of type String"),
  check("surname", "Surname is required")
    .optional()

    .isString("Surname muest be of type String"),
  check("phone", "Phone is required")
    .optional()

    // verificar si el numero telefonico es valido con la funcion validatePhone
    .custom((value) => {
      // const phoneRegex = /^\d{10}$/;
      // return phoneRegex.test(value);
      return validatePhoneNumber(value)
    })
    .withMessage("Phone number is invalid"),
  check("country", "Country is required")
    .optional()

    .isString("Country muest be of type String"),
  check("locality", "City is required")
    .optional()

    .isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]
