const pinHelpers = require('./lib/pin-helpers');
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    // the form will pass in title, desc, image, long, lat.. Use req.session.user_id to get the user_id foreign key.
    console.log(req.body)
    const pinInfo = {
      userID: req.session.user_id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.imgage,
      long: req.body.long,
      lat: req.body.lat
    }

    pinHelpers.addNewPin(knex, pinInfo, (err) => {
      if (err) {
        res.status(500).json("Something went wrong! Please try again.");
      } else {
        res.json(pinInfo);
      }
    });
  });

  return router;
}
