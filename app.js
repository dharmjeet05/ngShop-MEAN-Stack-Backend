const express = require("express");
require("dotenv").config();

const app = express();

const api = process.env.API_URL;

app.get(api + "/", (req, res) => {
  res.send("Hello API!");
});

app.listen(8000, () => {
  console.log(api);
  console.log("Server is successfully running on http://localhost:8000");
});
