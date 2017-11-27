const express     = require("express");
const favHelpers  = require('./lib/favorite-helpers');
const userHelpers = require('./lib/user-helpers');
const router = express.Router();

module.exports = (knex) => {

  router.put("/:pinId", [userHelpers.userLoggedIn], (req, res) => {
    const favInfo = {
    userID: req.session.user_id,
    pinID: JSON.parse(req.params.pinId)
    };

    knex("favourites")
    .where("user_id", favInfo.userID)
    .then((rows) => {
      let favorited = false;
      if (rows.length) {
        rows.forEach((row) => {
          if (row.pin_id === favInfo.pinID) {
          favorited = true;
          }
        });
      }
      return favorited;
    }).then((faved) => {
      if (faved) {
        favHelpers.deleteFavoritePin(knex, favInfo, (err) => {
          if (err) next(err);
          res.json("Unfavorited");
        });
      } else {
        favHelpers.addFavoritePin(knex, favInfo, (err) => {
          if (err) next(err) ;
          res.json("Favorited");
        });
      }
    })
  });

  return router;
}
