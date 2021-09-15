// import packages
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// initialize app variables
const app = express();

// middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));

// routes
const productsRouter = require("./routes/productsRoutes");

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);

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
