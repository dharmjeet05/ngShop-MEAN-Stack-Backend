// import packages
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// initialize app variables
const app = express();
const api = process.env.API_URL;

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// routes
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hair dresser",
    image: "some_url",
  };
  res.send(product);
});

// db connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("DB connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// listening app
app.listen(8000, () => {
  console.log("Server is successfully running on http://localhost:8000");
});
