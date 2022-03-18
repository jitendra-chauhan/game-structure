const CommonEventEmitter = require("../commonEventEmitter");
const { EVENTS } = require("../../constants");
const {
  sendEventToClient,
} = require("../socket");

function heartBeatEvent(payload) {
  console.log("====> get heartBeatEvent <-===");
  const { socket, data } = payload;
  const responseData = {
    en: EVENTS.HEART_BEAT_SOCKET_EVENT,
    data,
  };
  sendEventToClient(socket, responseData);
}

function doneEvent(payload) {
  console.log("====> get doneEvent <-===");
  const { socket, data } = payload;
  const responseData = {
    en: EVENTS.DONE_SOCKET_EVENT,
    data,
  };
  sendEventToClient(socket, responseData);
}


CommonEventEmitter.on(EVENTS.HEART_BEAT_SOCKET_EVENT, heartBeatEvent);

CommonEventEmitter.on(EVENTS.DONE_SOCKET_EVENT, doneEvent);

