const {
  format: { printf, timestamp, combine },
} = require("winston");

const logFormat = printf(
  ({ level, message, timestamp: ts }) => `${ts} [${level}]: ${message}`
);

module.exports = combine(timestamp(), logFormat);
