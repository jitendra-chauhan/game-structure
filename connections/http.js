const https = require("https");
const http = require("http");
const express = require("express");
const routes = require("../src/route");
const fs = require("graceful-fs");
const { config } = global;
let app = express();

// if is_http is ture to create a routes
if (config.is_http) {
  app.use("/", routes);
}

// if is_https is ture to create a https server other wise create a http server
if (typeof config.is_https != "undefined" && config.is_https) {
  var httpsOptions = {
    key: fs.readFileSync(""), // here cert key file path
    cert: fs.readFileSync(""), // here cert crt file path
  };
  app = https.createServer(httpsOptions, app);
} else {
  app = http.createServer(app);
}

module.exports = app;
