const db = require("@arangodb").db;
const query = require("@arangodb").query;

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

const create = ({ userId, name }) => {
  const document = db._collection("restaurants").insert({
    name,
    active: true,
  });

  db._collection("isOwn").insert({
    _from: userId,
    _to: document._id,
  });

  return getOwned(userId);
};

const editRestaurant = ({ id, name }) => {
  const restaurantKey = `restaurants/${id}`;

  query`
    LET restaurant = DOCUMENT(${restaurantKey})
    UPDATE restaurant WITH { name: ${name} } IN restaurants
  `;

  return getAllAsAdmin();
};

const deleteRestaurant = ({ id }) => {
  const restaurantKey = `restaurants/${id}`;

  query`
    LET restaurant = DOCUMENT(${restaurantKey})
    UPDATE restaurant WITH { active: false } IN restaurants
  `;

  return getAllAsAdmin();
};

module.exports = {
  create,
  getOwned,
  getAllAsAdmin,
  editRestaurant,
  deleteRestaurant,
  getAll: getUserRestaurants,
};
