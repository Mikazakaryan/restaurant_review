const db = require("@arangodb").db;

const UserCollection = db._collection("auth_users");

const getAll = () => UserCollection.byExample({ active: true }).toArray();

const deleteUser = ({ pathParams: { id } }) =>
  UserCollection.update(`auth_users/${id}`, { active: false });

const editUser = ({ body: { username, role }, pathParams: { id } }) => {
  const editedUser = UserCollection.update(`auth_users/${id}`, {
    role,
    username,
  });

  return { ...editedUser, username, role };
};

const whoami = (req) => req.currentUser;

module.exports = {
  getAll,
  whoami,
  editUser,
  deleteUser,
};
