module.exports = (req, res, next) => {
  if (!req.currentUser.isAdmin) return res.throw("unauthorized");
  next();
};
