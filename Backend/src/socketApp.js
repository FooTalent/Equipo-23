import express from "express";
import logger from "morgan";

import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3030;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(logger("dev"));


app.get("/connect/:instanceName", (req, res) => {
  const instanceName = req.params.instanceName;
  const socket = io(`wss://vps-4425808-x.dattaweb.com/${instanceName}`, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected to the Evolution API WebSocket");
    res.send("Connected to the WebSocket");
  });

  socket.on("event_name", (data) => {
    console.log("Event received:", data);

  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the Evolution API WebSocket");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
