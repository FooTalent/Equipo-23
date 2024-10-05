import { passportCall } from "../../middlewares/passportMiddleware.js";
import { chat } from "../../controllers/index.js";
import { Router } from "express";

const chatRouter = Router();

chatRouter.post(
  "/findContacts/:instanceName",
  passportCall("jwt"),
  chat.findAllContacts
);

chatRouter.post(
  "/findContacts/:instanceName/:remoteJid",
  passportCall("jwt"),
  chat.findOneContact
);

chatRouter.post(
  "/findMessages/:instanceName/:remoteJid",
  passportCall("jwt"),
  chat.findMessages
);

export default chatRouter;
