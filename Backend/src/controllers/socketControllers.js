import config from "../config/config.js";
import { io as socketClient } from "socket.io-client"; 

const BASE_WSS = config.basewss;

export const connectionSocket = (req, res) => {
  const instanceName = req.params.instanceName;

  // Crea una conexión al WebSocket
  const socket = socketClient(`${BASE_WSS}/${instanceName}`, {
    transports: ["websocket"], // Especificamos el transporte por WebSocket
  });

  socket.on("connect", () => {
    console.log("Conectado al WebSocket de la API Evolution");
    res.status(200).send("Conexión exitosa al WebSocket"); 
  });

  socket.on("chats.update", (data) => {
    console.log("Actualización de chats:", data);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado del WebSocket de la API Evolution");
  });

  socket.on("error", (error) => {
    console.error("Error en el WebSocket:", error.message);
    res.status(500).send("Error de conexión al WebSocket");
  });

};



