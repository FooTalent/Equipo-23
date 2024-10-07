import { passportCall } from "../../middlewares/passportMiddleware.js";
import { evoApi, evolution } from "../../controllers/index.js";
import { Router } from "express";

const evolutionApi = Router();

evolutionApi.post(
  "/instance/create/:instanceName",
  passportCall("jwt"),
  evolution.createInstance
);

evolutionApi.post(
    "/socket/create/:instanceName",
    passportCall("jwt"),
    evoApi.evolutionApiControllers
)

export default evolutionApi;