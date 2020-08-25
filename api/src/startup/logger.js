const winston = require("winston");

// var renderedError = pe.render(new Error('Some error message'));
// console.log(renderedError);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  // defaultMeta: {service: 'user-service'},
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      colorize: true,
      prettyPrint: true,
    })
  );
}

// Catch uncaught Exceptions
process.on("uncaughtException", async (ex) => {
  // console.log("ANCAUGHT EXCEPTION ACCURED.");
  //   logger.error(ex.message, ex);
  // console.log(pe.render(ex));
  //   pe.render(ex);
  //   process.exit(1);
});

process.on("unhandledRejection", async (ex) => {
  // console.log("Unhandled Rejection Accured.");
  //   logger.error(ex.message, ex);
  // logger.error(pe.render(ex));
  //   process.exit(1);
});

module.exports = logger;
