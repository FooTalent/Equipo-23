import { Router } from "express";
import { users } from "../../controllers/index.js";
import {
  passportCall,
  passportCallOptional,
} from "../../middlewares/passportMiddleware.js";
authorization;
import uploader from "../../utils/multer.js";
import { authorization } from "../../middlewares/authMiddleware.js";
import upload from "../../utils/multer.js";
import { validateUpdateUserCurrent } from "../../utils/validator/updateUserCurrent.js";

const userRouter = Router();

userRouter.get("/", passportCallOptional("jwt"), users.getUsers);
userRouter.get('/current', passportCall("jwt"), users.getUserCurrent)
userRouter.get("/:uid", passportCallOptional("jwt"), users.getUser);
userRouter.delete(
  "/:uid",
  passportCall("jwt"),
  authorization("admin"),
  users.deleteUser
);
userRouter.put("/current/update", passportCall("jwt"), validateUpdateUserCurrent, users.updateUserCurrent);
userRouter.put("/current/update/photo", passportCall("jwt"), upload.any('photo', 1), users.updatePhotoUserCurrent)
userRouter.put("/:uid", passportCall("jwt"), users.updateUser);
userRouter.get(
  "/vendor/:uid",
  passportCall("jwt"),
  authorization("user"),
  users.changeVendor
);
userRouter.post(
  "/:uid/photo",
  passportCall("jwt"),
  uploader.single("photo"),
  users.uploadProfilePhoto
);
userRouter.post(
  "/:uid/documents",
  passportCall("jwt"),
  uploader.fields([
    { name: "identification", maxCount: 1 },
    { name: "proofOfResidence", maxCount: 1 },
    { name: "accountStatement", maxCount: 1 },
  ]),
  users.uploadDocuments
);

userRouter.post("/sendEmailToResetPassword", users.sendEmailToResetPassword);
userRouter.post("/resetPassword", users.resetPassword);

export default userRouter;
