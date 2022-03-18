const { MongoClient } = require("mongodb");
const { logger, DB } = require("../src");
const { config } = global;

class MongoDB {
  constructor() {
    this.DB_NAME = "";
    this.url = null;
    this.db = null;
  }

  getUrl(DB_PROTO, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME) {
    return `${DB_PROTO}://${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
  }

  // connection setup
  connection(resolve, reject) {
    MongoClient.connect(
      this.url,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err, client) => {
        if (err) reject(err);

        this.db = client.db(this.DB_NAME);

        DB.init(this.db, client);

        logger.info("DB Connected successfully!");

        resolve(this.db);
      }
    );
  }
  async init() {
    const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = config;

    this.DB_NAME = DB_NAME;
    this.url = this.getUrl(
      "mongodb",
      DB_HOST,
      DB_USERNAME,
      DB_PASSWORD,
      DB_PORT,
      DB_NAME
    );
    logger.debug(this.url);

    return new Promise(this.connection.bind(this));
  }
}

module.exports = new MongoDB();
