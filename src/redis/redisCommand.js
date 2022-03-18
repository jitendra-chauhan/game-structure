const { promisify } = require("util");

class RedisCommands {
  constructor(redisClient) {
    this.KEY = {
      set: promisify(redisClient.set).bind(redisClient),
      setex: promisify(redisClient.setex).bind(redisClient),
      get: promisify(redisClient.get).bind(redisClient),
      mset: promisify(redisClient.mset).bind(redisClient),
      delete: promisify(redisClient.del).bind(redisClient),
      setnx: promisify(redisClient.setnx).bind(redisClient),
      pexpire: promisify(redisClient.pexpire).bind(redisClient),
    };

    this.SET = {
      add: promisify(redisClient.sadd).bind(redisClient),
      rem: promisify(redisClient.srem).bind(redisClient),
    };

    this.SORTEDSET = {
      add: promisify(redisClient.zadd).bind(redisClient),
      rem: promisify(redisClient.zrem).bind(redisClient),
    };

    this.QUEUE = {
      push: promisify(redisClient.rpush).bind(redisClient),
      pop: promisify(redisClient.lpop).bind(redisClient),
      peek: promisify(redisClient.lrange).bind(redisClient),
    };

    this.HASH = {
      hset: promisify(redisClient.hset).bind(redisClient),
      hget: promisify(redisClient.hget).bind(redisClient),
      hdel: promisify(redisClient.hdel).bind(redisClient),
      hmset: promisify(redisClient.hmset).bind(redisClient),
      hmget: promisify(redisClient.hmget).bind(redisClient),
      hgetall: promisify(redisClient.hgetall).bind(redisClient),
    };
  }
}

module.exports = RedisCommands;
