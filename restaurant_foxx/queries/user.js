const query = require("@arangodb").query;

const getAll = (userId) =>
  query`    
    FOR restaurant IN restaurants
    FILTER restaurant.active
    LET ratings = (
      FOR rate, edge IN 1..1 INBOUND restaurant belongs_to
        FILTER rate.active
        RETURN rate.rating
    )

    RETURN merge(restaurant, {
      lastRate: FIRST(
        FOR rate, edge IN 1..1 INBOUND restaurant belongs_to
          FILTER rate.active
          SORT rate.date DESC
          LIMIT 1
          RETURN MERGE(rate, {
            reply: FIRST(
              FOR reply IN 1..1 INBOUND rate replied_for
                LIMIT 1
                RETURN reply.text
            )
          })
      ),
      isRated: HAS(
        FIRST(
          FOR vertex, edge IN OUTBOUND SHORTEST_PATH
            ${userId} TO restaurant
            has_rated, belongs_to
            FILTER vertex.active
            RETURN vertex
        ),
      '_id'),
      lowestRate: LAST(ratings),
      highestRate: FIRST(ratings),
      rating: SUM(ratings) / LENGTH(ratings)
    })
  `.toArray();

module.exports = {
  getAll,
};
