module.exports = function (req, res, next) {
  console.log("req.user: ", req.user)
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  } else {
    next();
  }
};