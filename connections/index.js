const socketOps = require("./socket");
const app = require("./http");
const rdsOps = require("./redis");
const getConfig = require("./config");
const mongoOps = require("./mongo");

module.exports = { socketOps, rdsOps, mongoOps, app,getConfig };
