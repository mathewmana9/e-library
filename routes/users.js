const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// user model
const User = require("../models/User");

// Login routes
router.get("/login", async (req, res) => {
  res.render("pages/login");
});

// Register routes
router.get("/register", async (req, res) => {
  res.render("pages/register");
});

// Register handler
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const errors = [];

  // check for all fields
  if (!name || !email || !password) {
    errors.push({ msg: "All fields are required" });
  }

  // check for password match
  if (password !== confirmPassword) {
    errors.push({ msg: "passwords do not match" });
  }

  // check for password length
  if (password.length < 8) {
    errors.push({ msg: "Passwords characters should be at least 8" });
  }

  // check for errors
  if (errors > 0) {
    res.render("/pages/register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  } else {
    // check validation

    const user = await User.findOne({ email: email });
    // if user exists
    if (user) {
      errors.push({ msg: `Email is already registered` });
      res.render("pages/register", {
        errors,
        name,
        email,
        password,
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) =>
        bcrypt
          .hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            // save newUser
            newUser.save().then((user) => {
              req.flash({ success_msg: "You are now registered" });
              res.redirect("/pages/login");
            });
          })
          .catch((err) => console.log(err))
      );
    }

    res.redirect("/pages/login");
  }
});

// Login handler
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/pages/dashboard",
    failureRedirect: "/users/login",
    failFlash: true,
  })(req, res, next);
});

// Logout handler
router.get("/logout", (req, res) => {
  req.logout();
  req.flash(" success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
