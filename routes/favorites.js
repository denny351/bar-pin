const express = require("express");
const router = express.Router();
const favHelpers = require('./lib/favorite-helpers');

module.exports = (knex) => {
  router.put("/:pinId", (req, res) => {
    const favInfo = {
    userID: req.session.user_id,
    pinID: JSON.parse(req.params.pinId)
    };

    console.log(favInfo);

    favHelpers.findFavPin(knex, favInfo, (rows) => {
      let favorited = false;
      if (rows.length) {
        rows.forEach((row) => {
          if (Number(row.pin_id) === favInfo.pinID) {
            favorited = true;
          }
        });
      }
      console.log(favorited);
      if (favorited) {
        favHelpers.deleteFavoritePin(knex, favInfo, (err) => {
          if (err) throw err;
        });
      } else {
        favHelpers.addFavoritePin(knex, favInfo, (err) => {
          if (err) throw err;
        });
      }
    });
  })

  return router;
}
