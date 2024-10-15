//import database configuration
require("./config/db");

const express = require("express");
const bodyParser = express.json;
const cors = require("cors");

//import routes
// const articleRoutes = require("./Routes/article");
const authRoutes = require("./Routes/auth");

//create server app
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser());

// app.use("/api/articles", articleRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;

//api / auth / register;
