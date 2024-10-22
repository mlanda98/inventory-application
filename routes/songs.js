const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try{
    const result = await pool.query("SELECT * FROM songs");
    res.render("all-songs", {songs: result.rows});
  } catch (err){
    console.error("Error fetching songs:", err);
    res.status(500).send("Error  fetching songs");
  }

});

router.get("/genres", async (req, res) => {
  try{
    const result = await pool.query(`
      SELECT genre, array_agg(title) as songs
      FROM songs
      GROUP BY genre
      ORDER BY genre;
      `);
    res.render("genres", {genres: result.rows});
  } catch (err) {
    console.error("Error fetching genres:", err);
    res.status(500).send("Error fetching genres");
  }
}) 

module.exports = router




