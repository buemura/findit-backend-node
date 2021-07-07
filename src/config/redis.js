const redis = require("redis");
require("dotenv").config();

module.exports = redis.createClient({
  host: process.env.REDIS_HOST,
  no_ready_check: true,
  prefix: "blacklist:",
});
