const { EVENTS } = require("../../constants");
const logger = require("../logger");
const {
  sendHeartBeat,
} = require("./requestHelper");


const requestHandler = (socket, body) => {

  console.log("====> get <==requestHandler==", body);

  if (!socket) {
    logger.info(new Error("socket instance not found"));
  }

  /* +-------------------------------------------------------------------+
        desc: function to handle all event processes
        i/p: request = {en: `event name`, data: `data`}
    +-------------------------------------------------------------------+ */
  if (EVENTS.DISCONNECT != body.en && typeof body != "object") {
    body = JSON.parse(body);
  }
  const event = body.en;
  const data = body;
  if (event != EVENTS.HEART_BEAT_SOCKET_EVENT)
    logger.info("--- Res ---> event=====>", event);

  switch (event) {
    case EVENTS.HEART_BEAT_SOCKET_EVENT:
      sendHeartBeat(data, socket);
      break;
    default:
      break;
  }

  return false;
};

module.exports = requestHandler;
