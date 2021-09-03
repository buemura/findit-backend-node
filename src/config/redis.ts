import redis from "redis";

const redisConnection = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS,
  no_ready_check: true,
  prefix: "blacklist:",
});

export default redisConnection;
