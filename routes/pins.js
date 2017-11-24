const pinHelpers = require('./lib/pin-helpers');
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {

    const pinInfo = {
      userID: req.session.user_id,
      title: req.body.title,
      description: req.body.desc,
      image: req.body.img,
      long: req.body.lng,
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

  router.get("/", (req, res) => {

    pinHelpers.getAllPins(knex, (pins) => {
        res.json(pins);
    });
  });

  router.get("/mypins", (req, res) => {

    const userID = req.session.user_id;
    pinHelpers.getPinsById(knex, userID, (pins) => {
        res.json(pins);
    });
  });

  return router;
}
