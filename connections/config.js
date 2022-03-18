require("dotenv").config();
const logger = require("../src/logger");

const processEnv = process.env;
let configData = null;

function getEnvJSON(env) {
  console.log("=========> env <=====", env);

  const serverType = `${env}_SERVER_TYPE`;
  const serverPort = `${env}_HTTP_SERVER_PORT`;
  const socketServerPort = `${env}_SOCKET_SERVER_PORT`;
  const redisHost = `${env}_REDIS_HOST`;
  const redisPassword = `${env}_REDIS_PASSWORD`;
  const redisPort = `${env}_REDIS_PORT`;
  const redisDB = `${env}_REDIS_DB`;
  const dbProto = `${env}_DB_PROTO`;
  const dbHost = `${env}_DB_HOST`;
  const dbPort = `${env}_DB_PORT`;
  const dbUsername = `${env}_DB_USERNAME`;
  const dbPassword = `${env}_DB_PASSWORD`;
  const dbName = `${env}_DB_NAME`;

  return Object.freeze({
    SERVER_TYPE: processEnv[serverType],
    HTTP_SERVER_PORT: processEnv[serverPort],
    SOCKET_SERVER_PORT: processEnv[socketServerPort],
    REDIS_HOST: processEnv[redisHost],
    REDIS_PASSWORD: processEnv[redisPassword],
    REDIS_PORT: processEnv[redisPort],
    REDIS_DB: processEnv[redisDB],
    DB_PROTO: processEnv[dbProto],
    DB_HOST: processEnv[dbHost],
    DB_PORT: processEnv[dbPort],
    DB_USERNAME: processEnv[dbUsername],
    DB_PASSWORD: processEnv[dbPassword],
    DB_NAME: processEnv[dbName],
  });
}

function getConfig() {
  // set config env wise
  const { NODE_ENV } = process.env;
  console.log("========> NODE_ENV <====", NODE_ENV);
  console.log("====getConfig==> configData <=====", configData);

  if (NODE_ENV === "LOCAL") {
    configData = getEnvJSON(NODE_ENV);
    logger.info("start local server");
  } else {
    logger.info("start dev server");
  }
  
  return configData;
}

module.exports = getConfig ;
