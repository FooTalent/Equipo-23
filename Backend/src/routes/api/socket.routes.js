import { passportCall } from "../../middlewares/passportMiddleware.js";
import { connectionSocket } from "../../controllers/socketControllers.js";
import { Router } from "express";

const socketRouter = Router();

socketRouter.get(
  "/connect/:instanceName",
  passportCall("jwt"),
  connectionSocket
);

export default socketRouter;