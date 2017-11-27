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
const userHelpers   = require('./routes/lib/user-helpers');

const app = express();

const navRoutes   = require("./routes/navigation");
const usersRoutes = require("./routes/users");
const pinsRoutes  = require("./routes/pins");
const favoritesRoutes  = require("./routes/favorites");

app.use(morgan('dev'));
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'user_id',
  keys: ['key1']
}));

app.use((req, res, next) => {
  app.locals.userID   = (req.session.user_id) ? req.session.user_id : null;
  if (req.session.user_id) {
    knex('username').from('users').where('id', req.session.user_id).then((user) => {
      return app.locals.username = user[0].username
    })
  }
  next();
});

// Mount all resource routes
app.use("/", navRoutes());
app.use("/api/users", usersRoutes(knex));
app.use("/api/pins", pinsRoutes(knex));
app.use("/api/favorites", favoritesRoutes(knex));
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Error: Server cannot resolve your request.");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

