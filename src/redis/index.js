const RedisService = require("./redisService");
const RedisCommands = require("./redisCommand");
class Redis {
  init(redisClient) {
    this.commands = new RedisService(new RedisCommands(redisClient));
  }
}

/**
 * exports db model services, it will be used to devs to fetch,insert or update data to databse
 */
module.exports = new Redis();
