const createAuth = require("@arangodb/foxx/auth");

const Serializer = require("../serializers");

const auth = createAuth();

const users = module.context.collection("users");

const signup = ({ role, username, password }, req) => {
  const user = { role, username, passwordData: auth.create(password) };

  const meta = users.save(user);

  const userWithMeta = { ...user, ...meta };

  req.session.uid = userWithMeta._key;
  req.sessionStorage.save(req.session);
};

const login = (username, password, req, res) => {
  const user = users.firstExample({ username });
  const valid = auth.verify(user.passwordData, password);

  if (!valid) return false;

  req.session.uid = user._key;
  req.sessionStorage.save(req.session);

  return true;
};

const logout = (req) => {
  req.sessionStorage.clear(req.session);
};

const whoami = (req) => {
  const user = users.document(req.session.uid);

  return Serializer.serialize("user", user);
};

module.exports = {
  signup,
  login,
  logout,
  whoami,
};
