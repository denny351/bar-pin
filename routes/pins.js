const pinHelpers = require('./lib/pin-helpers');
const userHelpers = require('./lib/user-helpers');
const favHelpers = require('./lib/favorite-helpers');
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // POST NEW PIN

  router.post("/", [userHelpers.userLoggedIn], (req, res) => {

    const pinInfo = {
      userID: req.session.user_id,
      title: req.body.title,
      description: req.body.desc,
      image: req.body.img,
      long: req.body.lng,
      lat: req.body.lat,
      type: req.body.type
    }

    pinHelpers.addNewPin(knex, pinInfo, () => {
        res.json(pinInfo);
      });
    });

  // SHOW ALL PINS

  router.get("/", (req, res) => {

    pinHelpers.getAllPins(knex, (pins) => {
        res.json(pins);
    });
  });

  // SHOW LOGGED IN USER'S PINS

  router.get("/mypins", [userHelpers.userLoggedIn], (req, res) => {

    const userID = req.session.user_id;
    pinHelpers.getPinsByUserId(knex, userID, (pins) => {
        res.json(pins);
    });
  });

  // SHOW LOGGED IN USER'S FAVOURITE PINS

  router.get("/myfavs", [userHelpers.userLoggedIn], (req, res) => {
    const userID = req.session.user_id;
    favHelpers.getUserFavsById(knex, userID, (pins) => {
      let data = [];
      pins.forEach((pin) => {
        let object = {
          'id': pin.pin_id,
          'title': pin.title,
          'description': pin.description,
          'image': pin.image,
          'lat': pin.lat,
          'lng': pin.lng,
          'type': pin.type,
          'user_id': pin.user_id
        }
        data.push(object);
      });
      res.json(data);
    });
  });

  // UPDATE LOGGED IN USER'S PIN IF THEY OWN IT

  router.put("/:id/update",[userHelpers.userLoggedIn], (req, res) => {

    const updateInfo = {
      pinID: req.params.id,
      newTitle: req.body.title,
      newDesc: req.body.desc,
      newImg: req.body.img,
      newLong: req.body.long,
      newLat: req.body.lat
    }

    pinHelpers.getIdFromPin(knex, updateInfo.pinID, (pins) => {
      if (pins[0].user_id === req.session.user_id) {
        pinHelpers.updatePin(knex, updateInfo, () => {
          res.json("Success! Your pin has been updated.");
        });
      } else {
        res.status(401).json("You can't edit another user's pin!");
      }
    });
  });

  // DELETE LOGGED IN USER'S PIN IF THEY OWN IT

  router.delete("/:id/delete", [userHelpers.userLoggedIn], (req, res) => {
    const pinID = req.params.id;

    pinHelpers.getIdFromPin(knex, pinID, (pins) => {
      if (pins[0].user_id === req.session.user_id) {
        pinHelpers.deletePin(knex, pinID, (err) => {
          res.json("Success! Your pin has been deleted.");
        });
      } else {
        res.status(401).json("You can't delete another user's pin!");
      }
    });
  });

  return router;
}
