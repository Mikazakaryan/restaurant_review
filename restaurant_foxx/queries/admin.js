const query = require("@arangodb").query;

const getAll = () =>
  query`
    FOR restaurant IN restaurants
      FILTER restaurant.active
      RETURN MERGE(restaurant, {
         owner: FIRST(
            FOR user IN 1..1 INBOUND restaurant is_own
              RETURN user._id
          )
      })
  `.toArray();

const getOne = (id) =>
  query`
    LET restaurant = DOCUMENT(${id})
    RETURN MERGE(restaurant, {
       owner: FIRST(
          FOR user IN 1..1 INBOUND restaurant is_own
            RETURN user._id
        )
    })
`.toArray();

module.exports = {
  getAll,
  getOne,
};
