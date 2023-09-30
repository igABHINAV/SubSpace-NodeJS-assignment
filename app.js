const express = require("express");

if (process.env.NODE_ENV !== 'production')
    require("dotenv").config({ path: "./config/.env" });
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = require("./Routes/Dataroute");

app.use("", data);

module.exports = app;
