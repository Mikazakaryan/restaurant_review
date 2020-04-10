const query = require("@arangodb").query;

const users = module.context.collection("users");

const getAll = ({ session: { uid } }) => {
  const user = users.document(uid);
  if (user.role !== "admin") return [null, true];
  const dbUsers = query`
    FOR user IN auth_users
    FILTER user.active
    RETURN user
  `.toArray();
  return [dbUsers, false];
};

const deleteUser = (req, { id }) => {
  const user = users.document(req.session.uid);
  if (user.role !== "admin") return [null, true];

  const userKey = `auth_users/${id}`;

  query`
    LET user = DOCUMENT(${userKey})
    UPDATE user WITH { active: false } IN auth_users
  `;

  return getAll(req);
};

const editUser = (req, { id, username, role }) => {
  const user = users.document(req.session.uid);
  if (user.role !== "admin") return [null, true];

  const userKey = `auth_users/${id}`;
  query`
    LET user = DOCUMENT(${userKey})
    UPDATE user WITH { username: ${username}, role: ${role} } IN auth_users
  `;

  return getAll(req);
};

module.exports = {
  getAll,
  editUser,
  deleteUser,
};
