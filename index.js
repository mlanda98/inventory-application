const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM songs");
    res.render("index", {songs: result.rows});
  } catch (err){
    console.error("Error fetching songs:", err);
    res.status(500).send("Error fetching songs");å
  }
});

app.get("/songs/new", (req, res) => {
  res.render("add-song");
});

app.post("/songs", async (req, res) => {
  const {title, artist, album, genre, quantity} = req.body;

  const query = `
  INSERT INTO songs (title, artist, album, quantity)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [title, artist, album, quantity];

  try{
    await pool.query(query, values);
    res.redirect("/");
  } catch (err){
    console.error("Error adding song:", err);
    res.status(500).send("Error adding song");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

module.exports = pool;
