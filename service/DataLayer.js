module.exports = (require("knex"))({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: true,
  debug: true
})
