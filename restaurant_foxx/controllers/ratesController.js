const db = require("@arangodb").db;
const query = require("@arangodb").query;

const restaurantsController = require("./restaurantsController");

const editRate = ({ id, date, rating, comment }) => {
  if (rating > 5 || rating < 0) return [null, "Wrong Data"];
  if (new Date(date).toString() === "Invalid Date") return [null, "Wrong Data"];

  const rateKey = `rates/${id}`;

  query`
    LET rate = DOCUMENT(${rateKey})
    UPDATE rate WITH { date: ${date}, rating: ${rating}, comment: ${comment} } IN rates
  `;

  return [restaurantsController.getAllAsAdmin()];
};

const deleteRate = ({ id }) => {
  const rateKey = `rates/${id}`;

  query`
    LET rate = DOCUMENT(${rateKey})
    UPDATE rate WITH { active: false } IN rates
  `;

  return restaurantsController.getAllAsAdmin();
};

const rate = (userId, { restaurantKey, date, rating, comment }) => {
  const restaurantId = `restaurants/${restaurantKey}`;

  const rate = db._collection("rates").insert({
    date,
    rating,
    comment,
    active: true,
  });

  db._collection("belongsTo").insert({
    _from: rate._id,
    _to: restaurantId,
  });

  db._collection("hasRated").insert({
    _to: rate._id,
    _from: userId,
  });

  return restaurantsController.getUserRestaurants(userId);
};

module.exports = {
  rate,
  editRate,
  deleteRate,
};
