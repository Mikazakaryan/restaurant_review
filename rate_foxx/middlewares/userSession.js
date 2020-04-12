const db = require("@arangodb").db;

module.exports = (req, res, next) => {
  const sid = req._raw.cookies.sid;

  if (!sid) res.throw("unauthorized");

  const session = db._collection("auth_sessions").firstExample({ _key: sid });

  if (session) {
    const sessionUser = db
      ._collection("auth_users")
      .firstExample({ _key: session.uid });

    req.currentUser = sessionUser;
    req.currentUser.isUser = sessionUser.role === "user";
    req.currentUser.isAdmin = sessionUser.role === "admin";
    req.currentUser.isOwner = sessionUser.role === "owner";
  } else {
    res.throw("unauthorized");
  }

  next();
};
