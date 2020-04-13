const db = require("@arangodb").db;
const query = require("@arangodb").query;

const RatesCollection = db._collection("rates");
const HasRatedEdge = db._collection("has_rated");
const BelongsToEdge = db._collection("belongs_to");

const getAll = () =>
  query`
    FOR rate IN rates
      FILTER rate.active
      RETURN MERGE(rate, {
        ratedTo: FIRST(
          FOR restaurant IN 1..1 OUTBOUND rate belongs_to
          RETURN restaurant._id
        )
      })
  `.toArray();

const create = ({
  currentUser: { _id: userId },
  body: { restaurantKey, date, rating, comment },
}) => {
  const restaurantId = `restaurants/${restaurantKey}`;

  const rate = RatesCollection.insert({
    date,
    rating,
    comment,
    active: true,
  });

  BelongsToEdge.insert({
    _from: rate._id,
    _to: restaurantId,
  });

  HasRatedEdge.insert({
    _to: rate._id,
    _from: userId,
  });

  return { ...rate, date, rating, comment };
};

const editRate = (
  { pathParams: { id }, body: { date, rating, comment } },
  res
) => {
  if (
    rating > 5 ||
    rating < 0 ||
    new Date(date).toString() === "Invalid Date"
  ) {
    return res.throw(400, "Wrong Data");
  }

  const rateId = `rates/${id}`;
  RatesCollection.update(rateId, {
    date,
    rating,
    comment,
  });

  return query`
    LET rate = DOCUMENT(${rateId})
    RETURN MERGE(rate, {
      ratedTo: FIRST(
        FOR restaurant IN 1..1 OUTBOUND rate belongs_to
        RETURN restaurant._id
      )
    })
  `.toArray();
};

const deleteRate = ({ pathParams: { id } }) =>
  RatesCollection.update(`rates/${id}`, { active: false });

module.exports = {
  getAll,
  create,
  editRate,
  deleteRate,
};
