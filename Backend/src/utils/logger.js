import winston from "winston";
import config from "../config/config.js";
import path, { format } from "path";

const __dirname = path.resolve();

const customsLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};
//winston.addColors(customsLevelsOptions.colors);

const devLogger = winston.createLogger({
  levels: customsLevelsOptions.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [new winston.transports.Console({ level: "debug" })],
});

const prodLogger = winston.createLogger({
  levels: customsLevelsOptions.levels,
  //levels: customsLevelsOptions.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      level: "error",
      filename: `${__dirname}/src/logs/errors.log`,
    }),
  ],
});

export const addLogger = (req, res, next) => {
  const logger = config.environment == "production" ? prodLogger : devLogger;
  req.logger = logger;

  res.on("finish", () => {
    const statusCode = res.statusCode;
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const logLevel =
      statusCode >= 500 ? "error" : statusCode >= 400 ? "warning" : "info";
    logger.log(logLevel, `${req.method} ${fullUrl} ${statusCode}`);
  });
  next();
};
