module.exports = (req, res, next) => {
  if (!req.currentUser.isUser) return res.throw("unauthorized");
  next();
};
