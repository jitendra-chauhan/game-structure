const redis = require("redis");
const { logger, Redis } = require("../src");
const { config } = global;

const connectionCallback = async () =>
  new Promise((resolve, reject) => {
    const { RDS_HOST, RDS_AUTH, REDIS_PORT, RDS_DB } = config;

    const client = redis.createClient(6379, RDS_HOST);
    client.auth(RDS_AUTH);
    client.select(RDS_DB);

    // initialize redis service
    Redis.init(client);

    client.on("ready", () => {
      logger.info("Redis connected successfully");
      resolve(client);
    });

    client.on("error", (error) => {
      logger.error("Redis Client error:", error);
      reject(client);
    });
  });

const init = async () => connectionCallback();

module.exports = { init };
