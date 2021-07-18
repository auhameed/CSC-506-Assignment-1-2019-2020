module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(502).json({ message: "You need to login first" });
    res.redirect("/login");
  },
};
