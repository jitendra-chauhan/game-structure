const { transports } = require("winston");
const level = require("./level");
const format = require("./format");

/**
 * config for production
 */
const config = {
  level,
  format,
  transports: [new transports.Console({ level: "debug" })],
};

module.exports = config;
