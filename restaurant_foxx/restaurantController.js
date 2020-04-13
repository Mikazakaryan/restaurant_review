const db = require("@arangodb").db;

const adminQueries = require("./queries/admin");
const ownerQueries = require("./queries/owner");
const userQueries = require("./queries/user");

const IsOwnEdge = db._collection("is_own");
const RestaurantsCollection = db._collection("restaurants");

const getAll = ({ currentUser: user }) => {
  if (user.isAdmin) {
    return adminQueries.getAll();
  }

  if (user.isOwner) {
    return ownerQueries.getAll(user._id);
  }

  return userQueries.getAll(user._id);
};

const create = ({ currentUser: { _id: userId }, body: { name } }) => {
  const document = RestaurantsCollection.insert({
    name,
    active: true,
  });

  const newCollection = IsOwnEdge.insert({
    _from: userId,
    _to: document._id,
  });

  return { ...newCollection, name };
};

const editRestaurant = ({ pathParams: { id }, body: { name } }) => {
  const restaurantId = `restaurants/${id}`;
  RestaurantsCollection.update(restaurantId, { name });

  return adminQueries.getAll(restaurantId);
};

const deleteRestaurant = ({ pathParams: { id } }) =>
  RestaurantsCollection.update(`restaurants/${id}`, { active: false });

module.exports = {
  create,
  getAll,
  editRestaurant,
  deleteRestaurant,
};
