const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const User = require("./src/model/user");

const app = express();
const PORT = 4000;
const mongoDb = require("./src/config/db");

// MongoAtlas Config
mongoDb();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cors());
////////PASSPORT CONFIG ///////
app.use(
  require("express-session")({
    secret: "We'll be fine now",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Base home
app.get("/", (req, res) => {
  res.end("Hello wolrd!!!");
});
//All users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => res.status(500).json({ message: err }));
});
//User profile
app.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => res.status(500).json({ message: err }));
});
// Creating new user
app.post("/new-user", (req, res) => {
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
app.put("/user/:id", (req, res) => {
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
app.get("/test", (req, res) => {
  res.status(200).json("Hello wolrd");
});
// Change User password
app.put("/user/:id/change-password", (req, res) => {
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
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) return err;
      return res.redirect("/user/" + user._id);
    });
  })(req, res, next);
});

// Logout user
app.get("/logout", function (req, res) {
  req.logOut();
  res.status(200).json({ message: "User log out" });
});

app.listen(process.env.port || PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
