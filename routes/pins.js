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
      lat: req.body.lat,
      type: req.body.type
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
    pinHelpers.getPinsByUserId(knex, userID, (pins) => {
        res.json(pins);
    });
  });

  router.put("/:id/update",[userHelpers.userLoggedIn], (req, res) => {

    const updateInfo = {
      pinID: req.params.id,
      newTitle: req.body.title,
      newDesc: req.body.desc,
      newImg: req.body.img,
      newLong: req.body.long,
      newLat: req.body.lat
    }

    pinHelpers.updatePin(knex, updateInfo, (err) => {
      if(err) {
        res.status(500).json("Something went wrong! Please try again.");
      } else {
        res.json("Success! Your pin has been updated.");
      }
    });
  });

  router.delete("/:id/delete", [userHelpers.userLoggedIn], (req, res) => {
    const pinID = req.params.id;
    pinHelpers.deletePin(knex, pinID, (err) => {
      if(err) {
        res.status(500).json("Something went wrong! Please try again.");
      } else {
        res.json("Success! Your pin has been deleted.");
      }
    });
  });

  return router;
}
