const express = require("express");
const app = express();
require("dotenv").config();
const pool = require("./db")

const indexRoutes = require("./routes/index");
const songRoutes = require("./routes/songs");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRoutes);
app.use("/songs", songRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});



module.exports = pool;
