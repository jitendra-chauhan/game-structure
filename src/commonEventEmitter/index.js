const events = require("events");

class CustomEmitter extends events {}

module.exports = new CustomEmitter();
