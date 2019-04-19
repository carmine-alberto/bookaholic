module.exports = (require("knex"))({
  client: "pg",
  connection: process.env.DATABASE_URL,
  ssl: true,
  debug: true
})

//database("book").where({book_id: 8935171470}).then(data => {console.log(data[0].title)});
