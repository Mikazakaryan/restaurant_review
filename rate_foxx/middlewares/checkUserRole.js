module.exports = (role) => (req, res, next) => {
  if (!req.currentUser[role]) return res.throw("unauthorized");
  next();
};
