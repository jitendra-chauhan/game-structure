(async () => {
 const { config } = require("./connections");
  global.config = config();
  global.SERVER_ID = global.config.SERVER_TYPE;
  global.SERVER_PORT =global.config.HTTP_SERVER_PORT;
  global.is_http = true;
  global.is_https = false;
  const { logger } = require("./src");
  const { rdsOps, mongoOps, app } = require("./connections");

  (async () => {
    try {
      
      const promise = await Promise.all([
        mongoOps.init(),
        rdsOps.init(),
        
      ]);
      const mongoClient = promise[0];
      const redisClient = promise[1];

      global.redisClient = redisClient;
      global.mongoClient = mongoClient;
      

      app.listen(global.SERVER_PORT, () => {
        logger.info(`${global.SERVER_ID} Server listening to the port ${global.SERVER_PORT}`);
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
