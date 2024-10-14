import { check } from "express-validator";
import { validateResult } from "./validateHelper";
import { validatePhoneNumber } from "../validatePhone";

export const validateUpdateUserCurrent = [
  check("name", "Name is required")
    .exists()
    .not()
    .isEmpty(),
  check("surname", "Surname is required")
    .exists()
    .not()
    .isEmpty(),
  check("phone", "Phone is required")
    .exists()
    .not()
    .isEmpty()
    // verificar si el numero telefonico es valido con la funcion validatePhone
    .custom((value) => {
      // const phoneRegex = /^\d{10}$/;
      // return phoneRegex.test(value);
      return validatePhoneNumber(value)
    })
    .withMessage("Phone number is invalid"),
  check("country", "Country is required")
    .exists()
    .not()
    .isEmpty(),
  check("locality", "City is required")
    .exists()
    .not()
    .isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
]
