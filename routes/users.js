"use strict";

const userHelpers = require('./lib/user_functions');
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.put("/register", (req, res) => {

    const name = req.body.userName;
    const pass = req.body.password;

    if(!req.session.user_id) {
      if (name && pass) {
        knex('*')
        .from('users')
          .where({ username: name })
            .then(function(rows) {
              if (rows.length > 0) {
                res.status(400).json("This username already exists.");
              } else {
                knex('users')
                  .insert({ username: `${name}`, password: `${pass}` }).returning('id').then(function(id) {
                    req.session.user_id = id;
                    res.json(`Welcome, ${name}`);
                  });
              }
            });
      } else {
        res.status(400).json("You can't submit an empty form.");
      }
    } else {
      res.status(401).json("You're already logged in.");
    }

  });

  router.put("/login", (req, res) => {

    const name = req.body.userName;
    const pass = req.body.password;

    if(!req.session.user_id) {
      if (name && pass) {
        knex('*')
          .from('users')
            .where({ username: name })
              .then(function(rows) {
                if(rows[0].username === name && rows[0].password === pass) {
                  req.session.user_id = rows.id;
                  res.json(`Welcome ${name}!`);
                } else {
                  res.status(400).json("Your username or password is incorrect. Please try again!");
                }
              });
      } else {
        res.status(400).json("You can't submit an empty form.");
      }
    } else {
      res.status(401).json("You're already logged in!");
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/index");
  });

  return router;
}


