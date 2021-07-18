const express = require("express");
const router = express.Router();
const User = require("../model/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//All users
router.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => res.status(500).json({ message: err }));
});
//User profile
router.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => res.status(500).json({ message: err }));
});
// Creating new user
router.post("/new-user", (req, res) => {
  const newUser = {
    fullname: req.body.fullname,
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    passport: req.body.passport,
  };
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      passport.authenticate("local")(req, res, function () {
        return res.status(200).json({ user });
      });
    }
  });
});
//Edit User details
router.put("/user/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      fullname: req.body.fullname,
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      passport: req.body.passport,
    },
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!user) {
        return res.status(404).json({ message: "user not found" });
      } else {
        user.save((err, updatedUser) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            res.status(200).json({ updatedUser });
          }
        });
      }
    }
  );
});
// Change User password
router.put("/user/:id/change-password", (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      user.changePassword(
        req.body.oldpassword,
        req.body.newpassword,
        (err, user) => {
          if (err) {
            if (err.name === "IncorrectPasswordError") {
              res.status(500).json({ message: "Incorrect password" });
            } else {
              res.status(500).json({ message: "Something went wrong", err });
            }
          } else {
            res.status(200).json({ user });
          }
        }
      );
    }
  });
});

///Login user in
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
      res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) return err;
      return res.redirect("/user/" + user._id);
    });
  })(req, res, next);
});

// Logout user
router.get("/logout", function (req, res) {
  req.logOut();
  res.status(200).json({ message: "User log out" });
});

module.exports = router;
