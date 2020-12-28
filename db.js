const { Pool } = require("pg");
const client = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionTimeoutMillis: "1000",
  idleTimeoutMillis: "300000", //300s
});
module.exports = client;
