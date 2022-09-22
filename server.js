require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
//pg is just for testing
//const pg = require("pg");

const PORT = process.envPORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//const conString = process.env.PG_CONNECTIONSTRING;
// const client = new pg.Client(conString);
// client.connect(function (err) {
//   if (err) {
//     return console.error("could not connect to postgres", err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function (err, result) {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows[0].theTime);

//     client.end();
//   });
// });

app.listen(PORT, () => console.log(`Server is listening to ${PORT}`));

app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM movie");
    //console.log(rows);
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
});
