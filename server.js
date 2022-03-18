(async () => {
  const { config } = require("./connections");
  global.config = config();
  global.SERVER_ID = global.config.SERVER_TYPE;
  global.SERVER_PORT = global.config.SOCKET_SERVER_PORT;
  global.is_http = false;
  global.is_https = false;
  const { logger } = require("./src");
  const {
    socketOps,
    rdsOps,
    mongoOps,
    rebbitOps,
    app,
  } = require("./connections");

  (async () => {
    try {
      const promise = await Promise.all([
        mongoOps.init(),
        rdsOps.init(),

        socketOps(),
      ]);
      const mongoClient = promise[0];
      const redisClient = promise[1];
      const socketClient = promise[2];

      global.redisClient = redisClient;
      global.mongoClient = mongoClient;
      global.socketClient = socketClient;

      app.listen(global.SERVER_PORT, () => {
        logger.info(
          `${global.SERVER_ID} Server listening to the port ${global.SERVER_PORT}`
        );
      });
    } catch (error) {
      console.trace(error);

      logger.error(`Server listen error ${error}`);
    }
  })();

  process
    .on("unhandledRejection", (reason, p) => {
      logger.error(
        reason,
        "Unhandled Rejection at Promise >> ",
        new Date(),
        " >> ",
        p
      );
    })
    .on("uncaughtException", (err) => {
      logger.error("Uncaught Exception thrown", new Date(), " >> ", "\n", err);
    });
})();
