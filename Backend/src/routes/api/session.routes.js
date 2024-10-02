import { Router } from "express";

import { passportCall } from "../../middlewares/passportMiddleware.js";
import { sessions } from "../../controllers/index.js";
import { authorization } from "../../middlewares/authMiddleware.js";
import { validateCreateLogin } from "../../utils/validator/login.js";
import { validateCreateRegister } from "../../utils/validator/register.js";
import passport from "passport";

import '../../utils/passport.js'
import { generateAuthToken } from "../../utils/jwt.js";

const sessionRouter = Router();

sessionRouter.post("/register", validateCreateRegister, sessions.register);
sessionRouter.post('/verify-code', sessions.checkCodeRegister);
sessionRouter.post("/login", validateCreateLogin, sessions.login);
sessionRouter.get("/logout", passportCall("jwt"), sessions.logout);
sessionRouter.get("/current", passportCall("jwt"), sessions.current);
sessionRouter.delete("/inactives", passportCall('jwt'), authorization('admin'), sessions.deleteInactives);

sessionRouter.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/user.birthday.read"] })
)

sessionRouter.get("/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
)
export default sessionRouter;
