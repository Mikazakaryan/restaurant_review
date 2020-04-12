const createAuth = require("@arangodb/foxx/auth");

const auth = createAuth();

const users = module.context.collection("users");

const signup = ({ role, username, password }, req) => {
  const user = {
    role,
    username,
    active: true,
    passwordData: auth.create(password),
  };

  const meta = users.save(user);

  const userWithMeta = { ...user, ...meta };

  req.session.uid = userWithMeta._key;
  req.sessionStorage.save(req.session);
};

const login = ({ username, password }, req, res) => {
  const user = users.firstExample({ username });
  if (!user) return res.throw(400, "Wrong Inputs");

  const valid = auth.verify(user.passwordData, password);

  if (!valid || !user.active) return res.throw("unauthorized");

  req.session.uid = user._key;
  req.sessionStorage.save(req.session);
};

const logout = (req) => {
  req.sessionStorage.clear(req.session);
};

module.exports = {
  signup,
  login,
  logout,
};
