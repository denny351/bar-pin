const express = require('express');
const router  = express.Router();

module.exports = () => {

  // LANDING PAGE

  router.get("/", (req, res) => {
    res.render("landing");
  });

  // SINGLE PAGE APP - MAP PAGE

  router.get("/index", (req, res) => {
    res.render("index");
});


  return router;
}
