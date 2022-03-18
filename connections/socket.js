const SocketIO = require("socket.io");
const redisAdapter = require("socket.io-redis");
const server = require("./http");
const { SOCKET, MESSAGES, EVENTS, NUMERICAL } = require("../constants");
const {
  logger,
  requestHandler,
  CommonEventEmitter,
} = require("../src");
const getConfig = require("./config");

let socketClient = null;

function connectionCB(client) {
  logger.info(MESSAGES.SOCKET.INTERNAL.NEW_CONNECTION, client.id);

  CommonEventEmitter.emit(EVENTS.DONE_SOCKET_EVENT, {
    socket: client,
    data: { id: client.id },
  });

  // client.conn is default menthod for ping pong request
  client.conn.on(SOCKET.PACKET, (packet) => {
    if (packet.type === "ping") {
      logger.info('Ping received......');
    }
  });

  /**
   * error event handler
   */
  client.on(SOCKET.ERROR, (error) =>
    logger.error("client error......,", error)
  );

  /**
   * new request handler
   */
  client.on(SOCKET.REQUEST, (socket) => {
    const data = socket;
    requestHandler(client, data); 
  });

  /**
   * disconnect request handler
   */
  client.on(SOCKET.DISCONNECT, () => {
    requestHandler(client, { en: EVENTS.DISCONNECT });
  });
}

const createSocketServer = async () => {
    const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = getConfig();


  if (!socketClient) {
    const socketConfig = {
      transports: [SOCKET.WEBSOCKET, SOCKET.POLLING],
      pingInterval: NUMERICAL.THOUSAND, // to send ping/pong events for specific interval (milliseconds)
      pingTimeout: NUMERICAL.TEN_THOUSAND, // if ping is not received in the "pingInterval" seconds then milliseconds will be disconnected in "pingTimeout" milliseconds
      allowEIO3: true,
    };

    socketClient = SocketIO(server, socketConfig);

    // set redis adapter
    socketClient.adapter(
      redisAdapter({
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PASSWORD,
      })
    );

    socketClient.on(SOCKET.CONNECTION, connectionCB);
  }

  return socketClient;
};

module.exports = createSocketServer;
