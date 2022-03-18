const CommonEventEmitter = require("../../commonEventEmitter");
const { EVENTS } = require("../../../constants");

function heartBeat(data, socket) {
  CommonEventEmitter.emit(EVENTS.HEART_BEAT_SOCKET_EVENT, {
    socket,
    data: {},
  });
}

module.exports = heartBeat;
