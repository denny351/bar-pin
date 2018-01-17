"use strict";

const userHelpers = require('./lib/user-helpers');
const pinHelpers = require('./lib/pin-helpers');
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.put("/register", (req, res) => {

    const userInfo = {
      'name': req.body.userName,
      'pass': req.body.password
    }

      if (userInfo.name && userInfo.pass) {
        userHelpers.findUserFromName(knex, userInfo.name, (user) => {
          if (user.length) {
            res.status(400).json("This username already exists.");
          } else {
            userHelpers.addNewUser(knex, userInfo, (id) => {
              req.session.user_id = id[0];
              res.json(`Welcome, ${userInfo.name}`);
            });
          }
        });
      } else {
        res.status(400).json("You can't submit an empty form.");
      }
  });

  router.put("/login", (req, res) => {

    const userInfo = {
      'name': req.body.userName,
      'pass': req.body.password
    }

      if (userInfo.name && userInfo.pass) {
        userHelpers.findUserFromName(knex, userInfo.name, (user) => {
          if(!user.length) {
          	res.status(400).json("Username wasn't found.");
          } else if(user[0].username === userInfo.name && user[0].password === userInfo.pass) {
            req.session.user_id = user[0].id;
            res.json(`Welcome ${userInfo.name}!`);
          } else {
            res.status(400).json("Username and password combination not found. Please try again!");
          }
        });
      } else {
        res.status(400).json("You can't submit an empty form.");
      }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect(req.get('referer'));
  });

  // GET ALL PINS FOR A GIVEN USER

  router.get("/:username/pins", (req, res) => {
    const userName = req.params.username;
    pinHelpers.getPinsByUserName(knex, userName, (pins) => {
      res.json(pins);
    });
  });

   // GET ALL USERNAMES FOR USER FILTER

  router.get("/", (req, res) => {
    userHelpers.getUserList(knex, (users) => {
      let userList = [];
      users.forEach((user) => { //This is a .map
        userList.push(user.username);
      });
      res.json(userList);
    });
  });

  return router;
}
