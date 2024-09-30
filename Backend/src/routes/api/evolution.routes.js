import { passportCall } from "../../middlewares/passportMiddleware.js";
import { evolution } from "../../controllers/index.js";
import { Router } from "express";

const evolutionRouter = Router();

evolutionRouter.post(
  "/instance/create/:instanceName",
  passportCall("jwt"),
  evolution.createInstance
);

export default evolutionRouter;
