var dbEngine = process.env.DB_ENVIRONMENT || "development";
var config = require("./knexfile")[dbEngine];
module.exports = require("knex")(config);
