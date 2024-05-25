const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Uncomment to enable CORS (In case of a CORS error)
// app.use(cors());

// Logging middleware
app.use(morgan("combined"));

app.use(express.json());

module.exports = app;
