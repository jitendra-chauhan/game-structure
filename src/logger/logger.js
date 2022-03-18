const { createLogger } = require("winston");
const config = require("./config/config");
const level = require("./config/level");
const { formatLogMessages } = require("./helper");

const winston = createLogger(config);

/**
 *
 * formats and logs message
 * @param {Number} type
 * @param  {...any} messages
 */
const logger = (type, ...messages) => {
  const message = formatLogMessages(messages);

  switch (type) {
    case level.warn:
      winston.warn(message);
      break;

    case level.info:
      winston.info(message);
      break;

    case level.debug:
      winston.debug(message);
      break;

    case level.error:
      winston.error(message);
      break;

    // can throw error here TBD
    default:
      break;
  }

  return { type, message };
};

module.exports = logger;
