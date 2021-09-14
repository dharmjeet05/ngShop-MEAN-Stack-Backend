const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello API!");
});

app.listen(8000, () => {
  console.log("Server is successfully running on http://localhost:8000");
});
