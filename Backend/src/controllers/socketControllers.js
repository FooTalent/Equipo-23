import { socketEvolution } from "../services/socket.services.js";

export const connectionSocket = async (req, res) => {
  const instanceName = req.params.instanceName;

  try {
    await socketEvolution(instanceName);
    res.status(200).jsonjson({
      status: 200,
      response: {
        message: "Conectado al WebSocket de la API Evolution" ,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      response: {
        message: "Error al conectarse al websocket",
      },
    });
  }
};

