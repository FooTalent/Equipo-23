import { passportCall } from "../../middlewares/passportMiddleware.js";
import { evolution } from "../../controllers/index.js";
import { Router } from "express";

const evolutionRouter = Router();

evolutionRouter.post(
  "/instance/create/:instanceName",
  passportCall("jwt"),
  evolution.createInstance
);

evolutionRouter.get(
  "/instance/connectionState/:instanceName",
  passportCall("jwt"),
  evolution.connectionState
);

evolutionRouter.get(
  "/instance/connect/:instanceName",
  passportCall("jwt"),
  evolution.instanceConnect
);

evolutionRouter.delete(
  "/instance/logout/:instanceName",
  passportCall("jwt"),
  evolution.logoutInstance
)

export default evolutionRouter;
