const express = require("express");
const { ensureAuthenticated } = require("../config/auth");

const router = express.Router();

// landing page
router.get("/", (req, res) => {
  res.render("index");
});

//Dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  res.render("pages/dashboard", {
    fullname: req.user.fullname,
  });
});

module.exports = router;
