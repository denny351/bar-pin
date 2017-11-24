const express = require('express');
const router  = express.Router();

module.exports = () => {

  // Home page
  router.get("/", (req, res) => {
    res.render("landing");
  });

  router.get("/index", (req, res) => {
    res.render("index");
});


  return router;
}
