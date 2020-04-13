const query = require("@arangodb").query;

const getAll = (userId) =>
  query`
    FOR restaurant IN 1..1 OUTBOUND ${userId} is_own
      FILTER restaurant.active
      LET ratings = (
        FOR rate IN 1..1 INBOUND restaurant belongs_to
          FILTER rate.active
          RETURN rate.rating
      )
      RETURN MERGE(restaurant, {
        rates: (
          FOR rate IN 1..1 INBOUND restaurant belongs_to
            RETURN MERGE(rate, {
              commentedBy: FIRST(
                FOR user IN 1..1 INBOUND rate has_rated
                  LIMIT 1
                  RETURN user.name
              ),
              reply: FIRST(
                FOR reply IN 1..1 INBOUND rate replied_for
                  LIMIT 1
                  FILTER reply.active
                  RETURN reply.text
              )
            })
        ),
        rating: AVG(ratings),
        lowestRate: MIN(ratings),
        highestRate: MAX(ratings)
      })
  `.toArray();

module.exports = {
  getAll,
};
