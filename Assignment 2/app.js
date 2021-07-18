const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const User = require("./src/model/user");

const app = express();
const PORT = 4000 || process.env;
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

///// CURRENT USER MIDDLEWARE ///////
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
// Base home
app.get("/", (req, res) => {
  res.end("Hello wolrd!!!");
});

app.use(require("./src/routes/userRoute"));
app.use(require("./src/routes/postRoute"));

app.listen(process.env.port || PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
