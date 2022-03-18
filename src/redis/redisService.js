class RedisService {
  constructor(redisCommand) {
    this.redisCommand = redisCommand;
  }

  async setValueInKey(key, obj) {
    return this.redisCommand.KEY.set(key, JSON.stringify(obj));
  }

  async setValueInKeyWithExpiry(key, obj, exp) {
    return this.redisCommand.KEY.setex(key, exp, JSON.stringify(obj));
  }

  async getValueFromKey(key) {
    const valueStr = await this.redisCommand.KEY.get(key);
    return JSON.parse(valueStr);
  }

  async deleteKey(Key) {
    return this.redisCommand.KEY.delete(Key);
  }
  
}

module.exports = RedisService;
