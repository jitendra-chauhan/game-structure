function sendEventToClient(socket, data) {
  const { socketClient } = global;
  const encData = data;
  if (typeof socket !== "string") socket.emit("res", { data: encData });
  else socketClient.to(socket).emit("res", { data: encData });
}

function sendEventToRoom(roomId, data) {
  const { socketClient } = global;
  const encData = data;
  socketClient.to(roomId).emit("res", { data: encData });
}

function addClientInRoom(socket, roomId) {
  return socket.join(roomId);
}


function getAllSocketsInTable(roomId) {
  const { socketClient } = global;
  return socketClient.in(roomId).allSockets();
}

function getSocketFromSocketId(socketId) {
  const { socketClient } = global;
  return socketClient.sockets.sockets.get(socketId);
}

module.exports = {
  getSocketFromSocketId,
  getAllSocketsInTable,
  sendEventToClient,
  sendEventToRoom,
  addClientInRoom,
};
