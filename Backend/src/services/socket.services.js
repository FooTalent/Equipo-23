import config from "../config/config.js";
import { io as socketClient } from "socket.io-client";
import { io } from "../app.js";

const BASE_WSS = config.basewss;


export const socketEvolution = async (instanceName) => {
  // Crea una conexión al WebSocket
  const socket = socketClient(`${BASE_WSS}/${instanceName}`, {
    transports: ["websocket"], // Especificamos el transporte por WebSocket
  });

  socket.on("connect", () => {
    console.log("Conectado al WebSocket de la API Evolution");

  });

  socket.on("chats.update", (data) => {
    console.log("Actualización de chats:", data);

    const newData = {
      event: data.event,
      instance: data.instance,
      remoteJid: data.data[0].remoteJid,
      date_time: data.date_time,


    }
   
        io.emit("chats.update", newData);
  });

  socket.on("send.message", (data) => {
    console.log("Envio de mensaje:", data);

    io.emit("send.message", data);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado del WebSocket de la API Evolution");
  });

  socket.on("error", (error) => {
    console.error("Error en el WebSocket:", error.message);
  
  });


};
