"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

 router.put("/register", (req, res) => {

    const name = req.body.userName;
    const pass = req.body.password;

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

  });

  return router;
}
