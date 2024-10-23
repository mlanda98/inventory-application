const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM songs");
    res.render("all-songs", { songs: result.rows });
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).send("Error fetching songs");
  }
});

router.get("/genres", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT genre, array_agg(title) AS songs
      FROM songs
      GROUP BY genre;
      `);
    res.render("genres", { genres: result.rows });
  } catch (err) {
    console.error("Error fetching genres:", err);
    res.status(500).send("Error fetching genres");
  }
});

router.get("/edit/:id", async (req, res) => {
  const songId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM songs WHERE id = $1", [
      songId,
    ]);
    const song = result.rows[0];

    if (!song) {
      return res.status(404).send("Song not found");
    }

    res.render("edit-song", { song });
  } catch (err) {
    console.error("Error fetching song for update:", err);
    res.status(500).send("Error fetching song for update");
  }
});
router.post("/delete/:id", async (req, res) => {
  const songId = req.params.id;

  try {
    await pool.query("DELETE FROM songs WHERE id = $1", [songId]);
    res.redirect("/songs");
  } catch (err) {
    console.error("Error deleting song:", err);
    res.status(500).send("Error deleting song");
  }
});

router.get("/new", (req, res) => {
  res.render("add-song");
});

router.post("/update/:id", async (req, res) => {
  const songId = req.params.id;
  const { title, artist, album, genre, quantity } = req.body;

  const query = `UPDATE songs
   SET title = $1, artist = $2, album = $3, genre = $4, quantity = $5
   WHERE id = $6 RETURNING *
  `;
  const values = [title, artist, album, genre, quantity, songId];
  try {
    await pool.query(query, values);
    res.redirect("/songs");
  } catch (err) {
    console.error("Error updating song:", err);
    res.status(500).send("Error updating song");
  }
});
router.post("/", async (req, res) => {
  const { title, artist, album, genre, quantity } = req.body;
  const query = `
  INSERT INTO songs (title, artist, album, genre, quantity)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [title, artist, album, genre, quantity];

  try {
    await pool.query(query, values);
    res.redirect("/songs");
  } catch (err) {
    console.error("Error adding song:", err);
    res.status(500).send("Error adding song");
  }
});

module.exports = router;
