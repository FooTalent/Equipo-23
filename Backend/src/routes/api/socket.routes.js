import { passportCall } from "../../middlewares/passportMiddleware.js";
import { socket } from "../../controllers/index.js";
import { Router } from "express";

const socketRouter = Router();

socketRouter.get(
  "/connect/:instanceName",
  passportCall("jwt"),
  socket.connectionSocket,
);

export default socketRouter;