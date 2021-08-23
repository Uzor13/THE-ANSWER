module.exports = {
  isAuth: async (req, res, next) => {
    if (!req.session.isLoggedIn) {
      // return res.redirect("/login");
      return res.json({
        msg: "Please login to continue",
      });
    }
    next();
  },
};
