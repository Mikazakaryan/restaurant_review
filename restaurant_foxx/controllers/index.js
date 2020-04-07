const db = require("@arangodb").db;
const query = require("@arangodb").query;

const getRestaurants = (userId) =>
  query`    
  FOR restaurant IN restaurants
    LET ratings =  (
      FOR user, vote IN 1..1 INBOUND restaurant hasRated
      RETURN vote.rating
    )

    RETURN merge(restaurant, {
      isRated: HAS(
        FIRST(
          FOR vote, edge IN 1..1 INBOUND restaurant hasRated
          FILTER edge._from == ${userId}  
          RETURN edge   
        ), 
      '_id'),
      lastRate: FIRST(
        FOR user, vote IN 1..1 INBOUND restaurant hasRated
        SORT vote.date DESC
        LIMIT 1
        RETURN vote
      ),
      lowestRate: LAST(ratings),
      highestRate: FIRST(ratings),
      rating: SUM(ratings) / LENGTH(ratings)
    })
  `.toArray();

const rate = (userId, { restaurantKey, date, rating, comment }) => {
  const restaurantId = `restaurants/${restaurantKey}`;

  db._collection("hasRated").insert({
    rating: rating,
    _from: userId,
    comment: comment,
    _to: restaurantId,
    date: new Date(date),
  });

  return getRestaurants(userId);
};

module.exports = {
  rate,
  getAll: getRestaurants,
};
