const db = require("@arangodb").db;
const query = require("@arangodb").query;

const getUserRestaurants = (userId) =>
  query`    
  FOR restaurant IN restaurants
    FILTER restaurant.active
    LET ratings = (
      FOR rate, edge IN 1..1 INBOUND restaurant belongsTo
        FILTER rate.active
        RETURN rate.rating
    )

    RETURN merge(restaurant, {
      lastRate: FIRST(
        FOR rate, edge IN 1..1 INBOUND restaurant belongsTo
          FILTER rate.active
          SORT rate.date DESC
          LIMIT 1
          RETURN MERGE(rate, {
            reply: FIRST(
              FOR reply IN 1..1 INBOUND rate repliedFor
                LIMIT 1
                RETURN reply.text
            )
          })
      ),
      isRated: HAS(
        FIRST(
          FOR vertex, edge IN OUTBOUND SHORTEST_PATH
            ${userId} TO restaurant
            hasRated, belongsTo
            FILTER vertex.active
            RETURN vertex
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
      FILTER restaurant.active
      LET ratings = (
        FOR rate IN 1..1 INBOUND restaurant belongsTo
          FILTER rate.active
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
                  FILTER reply.active
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

const getAllAsAdmin = () => {
  const restaurants = query`
    FOR restaurant IN restaurants
      FILTER restaurant.active
      RETURN MERGE(restaurant, {
         owner: FIRST(
            FOR user IN 1..1 INBOUND restaurant isOwn
              RETURN user._id
          )
      })
  `.toArray();

  const replies = query`
    FOR reply IN replies
      FILTER reply.active
      RETURN MERGE(reply, {
        repliedTo: FIRST(
          FOR rate IN 1..1 OUTBOUND reply repliedFor
          RETURN rate._id
        )
      })
  `.toArray();

  const rates = query`
    FOR rate IN rates
      FILTER rate.active
      RETURN MERGE(rate, {
        ratedTo: FIRST(
          FOR restaurant IN 1..1 OUTBOUND rate belongsTo
          RETURN restaurant._id
        )
      })

    
  `.toArray();

  return {
    rates,
    replies,
    restaurants,
  };
};

module.exports = {
  rate,
  reply,
  create,
  getOwned,
  getAllAsAdmin,
  getAll: getUserRestaurants,
};
