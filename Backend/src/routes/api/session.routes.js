import { Router } from "express";

import { passportCall } from "../../middlewares/passportMiddleware.js";
import { sessions } from "../../controllers/index.js";
import { authorization } from "../../middlewares/authMiddleware.js";
import { validateCreateLogin } from "../../utils/validator/login.js";
import { validateCreateRegister } from "../../utils/validator/register.js";
import * as passport from 'passport';

const sessionRouter = Router();

sessionRouter.post("/register", validateCreateRegister, sessions.register);
sessionRouter.post('/verify-code', sessions.checkCodeRegister);
sessionRouter.post("/login", validateCreateLogin, sessions.login);
sessionRouter.get("/logout", passportCall("jwt"), sessions.logout);
sessionRouter.get("/current", passportCall("jwt"), sessions.current);
sessionRouter.delete("/inactives", passportCall('jwt'), authorization('admin'), sessions.deleteInactives);

sessionRouter.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

sessionRouter.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.cookie("token", req.user.token, { httpOnly: true });
    res.redirect("/");
  }
)
export default sessionRouter;
