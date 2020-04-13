const createAuth = require("@arangodb/foxx/auth");

const auth = createAuth();

const users = module.context.collection("users");

const signup = (req, res) => {
  try {
    const {
      body: { role, username, password },
    } = req;

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
  } catch (e) {
    return res.throw("bad request", "Username already taken", e);
  }
};

const login = (req, res) => {
  const {
    body: { username, password },
  } = req;

  const user = users.firstExample({ username });
  if (!user) return res.throw(400, "Wrong Inputs");

  const valid = auth.verify(user.passwordData, password);

  if (!valid || !user.active) return res.throw("unauthorized");

  req.session.uid = user._key;
  req.sessionStorage.save(req.session);
};

const logout = (req) => {
  try {
    req.sessionStorage.clear(req.session);
  } catch (error) {
    console.debug(`No valid session was found: ${req.session}`);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
