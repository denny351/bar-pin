require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";

const express       = require("express");
const bodyParser    = require("body-parser");
const knexConfig    = require("./knexfile");
const knex          = require("knex")(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');
const cookieSession = require('cookie-session');

const app = express();

const usersRoutes = require("./routes/users");
const pinsRoutes  = require("./routes/pins");

app.use(morgan('dev'));
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'user_id',
  keys: ['key1']
}));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/pins", pinsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.redirect("/index");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

