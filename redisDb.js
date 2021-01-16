const bluebird = require("bluebird");
const redis = require("redis");
require("dotenv").config();

class RedisDB {
  constructor() {
    this.redis = bluebird.promisifyAll(redis);
  }

  connectDB() {
    const client = this.redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    );
    client.auth(process.env.REDIS_PASSWORD);

    client.once("error", (err) => {
      console.error("Redis connect error", err);
      process.exit(1);
    });

    client.on("ready", () => {
      console.log("Redis connected");
    });
    return client;
  }
}

module.exports = new RedisDB().connectDB();
