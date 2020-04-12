const db = require("@arangodb").db;
const query = require("@arangodb").query;

const ReplyCollection = db._collection("replies");

const getAll = () =>
  query`
    FOR reply IN replies
      FILTER reply.active
      RETURN MERGE(reply, {
        repliedTo: FIRST(
          FOR rate IN 1..1 OUTBOUND reply replied_for
          RETURN rate._id
        )
      })
  `.toArray();

const create = ({ body: { id, text }, currentUser: { _id: userId } }) => {
  const reply = db._collection("replies").insert({
    text,
    active: true,
  });

  db._collection("has_replied").insert({
    _from: userId,
    _to: reply._id,
  });

  db._collection("replied_for").insert({
    _from: reply._id,
    _to: `rates/${id}`,
  });

  return { ...reply, text };
};

const editReply = ({ pathParams: { id }, body: { text } }) => {
  const replyId = `replies/${id}`;
  ReplyCollection.update(replyId, { text });

  return query`
    LET reply = DOCUMENT(${replyId})
      RETURN MERGE(reply, {
        repliedTo: FIRST(
          FOR rate IN 1..1 OUTBOUND reply replied_for
          RETURN rate._id
        )
      })
  `.toArray();
};

const deleteReply = ({ pathParams: { id } }) =>
  ReplyCollection.update(`replies/${id}`, { active: false });

module.exports = {
  getAll,
  create,
  editReply,
  deleteReply,
};
