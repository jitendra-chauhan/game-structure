const SOCKET = require("./socket");
const MESSAGES = require("./messages");
const NUMERICAL = require("./numerical");
module.exports = Object.freeze({
  EVENTS: {
    DONE_SOCKET_EVENT: "DONE",
    DISCONNECT: "DISCONNECT",
    HEART_BEAT_SOCKET_EVENT: "HEART_BEAT",
  },
  SOCKET,
  MESSAGES,
  NUMERICAL,
});
