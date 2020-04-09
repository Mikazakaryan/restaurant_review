const db = require("@arangodb").db;
const query = require("@arangodb").query;

const getUserRestaurants = (userId) =>
  query`    
  FOR restaurant IN restaurants
    LET ratings = (
      FOR rate, edge IN 1..1 INBOUND restaurant belongsTo
      RETURN rate.rating
    )

    RETURN merge(restaurant, {
      lastRate: FIRST(
        FOR rate, edge IN 1..1 INBOUND restaurant belongsTo
        SORT rate.date DESC
        LIMIT 1
        RETURN rate
      ),
      isRated: HAS(
        FIRST(
          FOR vertex, edge IN OUTBOUND SHORTEST_PATH
          ${userId} TO restaurant
          hasRated, belongsTo
          return vertex
        ),
      '_id'),
      lowestRate: LAST(ratings),
      highestRate: FIRST(ratings),
      rating: SUM(ratings) / LENGTH(ratings)
    })
  `.toArray();

const rate = (userId, { restaurantKey, date, rating, comment }) => {
  const restaurantId = `restaurants/${restaurantKey}`;

  const rate = db._collection("rates").insert({
    date,
    rating,
    comment,
  });

  db._collection("belongsTo").insert({
    _from: rate._id,
    _to: restaurantId,
  });

  db._collection("hasRated").insert({
    _to: rate._id,
    _from: userId,
  });

  return getUserRestaurants(userId);
};

const getOwned = (userId) =>
  query`
    FOR restaurant IN 1..1 OUTBOUND ${userId} isOwn
      LET ratings = (
        FOR rate IN 1..1 INBOUND restaurant belongsTo
        RETURN rate.rating
      )
      RETURN MERGE(restaurant, {
        rates: (
          FOR rate IN 1..1 INBOUND restaurant belongsTo
          RETURN MERGE(rate, {
            commentedBy: FIRST(
              FOR user IN 1..1 INBOUND rate hasRated
                LIMIT 1
                RETURN user.name
            ),
            reply: FIRST(
              FOR reply IN 1..1 INBOUND rate repliedFor
                LIMIT 1
                RETURN reply.text
            )
          })
        ),
        lowestRate: LAST(ratings),
        highestRate: FIRST(ratings),
        rating: SUM(ratings) / LENGTH(ratings)
      })
  `.toArray();

const create = ({ userId, name }) => {
  const document = db._collection("restaurants").insert({
    name,
  });

  db._collection("isOwn").insert({
    _from: userId,
    _to: document._id,
  });

  return getOwned(userId);
};

const reply = ({ id, text, userId }) => {
  const reply = db._collection("replies").insert({
    text,
  });

  db._collection("hasReplied").insert({
    _from: userId,
    _to: reply._id,
  });

  db._collection("repliedFor").insert({
    _from: reply._id,
    _to: `rates/${id}`,
  });

  return getOwned(userId);
};

module.exports = {
  rate,
  reply,
  create,
  getOwned,
  getAll: getUserRestaurants,
};
