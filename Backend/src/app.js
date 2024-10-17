import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import config from "./config/config.js";
import initializatePassport from "./utils/passport.js";
import { addLogger } from "./utils/logger.js";
import routes from "./routes/index.js";
import tokenExpirationMiddleware from "./middlewares/tokenExpirationMiddleware.js";
import session from "express-session";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
export const io = new Server(server);

const PORT = config.port;

const allowedOrigins = config.environment == 'production' ? ['https://prod-minegocio.netlify.app', 'https://equipo-23-develop-backend.onrender.com'] : ['https://beta-minegocio.netlify.app', 'http://localhost:8080'];

const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true,
};

app.use(cors(corsOptions));

server.listen(PORT, () => {
  console.log(`listening to the server on ${config.AppUrl}:${PORT}`);
});

app.get("/", (req, res) => {

  res.sendFile(process.cwd() + "/public/index.html")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addLogger);

app.use(cookieParser());
initializatePassport();
app.use(passport.initialize());
app.use(tokenExpirationMiddleware);

app.use(routes);

