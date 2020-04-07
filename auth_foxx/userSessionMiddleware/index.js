const users = module.context.collection("users");

module.exports = (req, _res, next) => {
  if (req.session.uid) {
    try {
      req.user = users.document(req.session.uid);
    } catch (e) {
      req.sessionStorage.clear(req.session);
    }
  }

  next();
};
