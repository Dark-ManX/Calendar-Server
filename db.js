const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.connect(function (err) {
  if (err) throw err;
  console.log("Databese connect success!");
});

module.exports = pool;
