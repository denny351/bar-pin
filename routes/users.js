"use strict";

const userHelpers = require('./lib/user-helpers');
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.put("/register", (req, res) => {
    const userInfo = {
      'name': req.body.userName,
      'pass': req.body.password
    }

    if(!req.session.user_id) {
      if (userInfo.name && userInfo.pass) {
        userHelpers.findUserFromName(knex, userInfo.name, (user) => {
          if (user.length > 0) {
            res.status(400).json("This username already exists.");
          } else {
            userHelpers.addNewUser(knex, userInfo, (id) => {
              req.session.user_id = id;
              res.json(`Welcome, ${userInfo.name}`);
            });
          }
        });
      } else {
        res.status(400).json("You can't submit an empty form.");
      }
    } else {
      res.status(400).json("You're already logged in.");
    }
  });

  router.put("/login", (req, res) => {
    const userInfo = {
      'name': req.body.userName,
      'pass': req.body.password
    }

    if(!req.session.user_id) {
      if (userInfo.name && userInfo.pass) {
        userHelpers.findUserFromName(knex, userInfo.name, (user) => {
          if(user[0].username === userInfo.name && user[0].password === userInfo.pass) {
            req.session.user_id = user.id;
            res.json(`Welcome ${userInfo.name}!`);
          } else {
            res.status(400).json("Your username or password is incorrect. Please try again!");
          }
        });
      } else {
        res.status(400).json("You can't submit an empty form.");
      }
    } else {
      res.status(400).json("You're already logged in!");
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/index");
  });

  return router;
}


