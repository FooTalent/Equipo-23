import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
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


const __dirname = path.resolve();
const PORT = config.port;

const allowedOrigins =
  config.environment === "production" ? "*" : "http://localhost:8080";

app.use(session({
  secret: config.tokenKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}))
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

// Documentación Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de e-commerce coder",
      description: "API para el ecommerce",
    },
  },
  apis: [`${path.join(__dirname)}/docs/**/*.yaml`],
};

const specs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.use(addLogger);

app.use(cookieParser());
initializatePassport();
app.use(passport.initialize());
app.use(tokenExpirationMiddleware);

app.use(routes);
