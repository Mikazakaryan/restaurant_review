module.exports = (req, res, next) => {
  if (!req.currentUser.isOwner) return res.throw("unauthorized");
  next();
};
