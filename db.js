const { Pool } = require("pg");

// const { USER, HOST, DATABASE, PASSWORD } = process.env;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

const client = new Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: 5432,
});

client.connect(function (err) {
  if (err) throw err;
  console.log("Databese connect success!");
});

module.exports = client;
