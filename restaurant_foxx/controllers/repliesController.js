const db = require("@arangodb").db;
const query = require("@arangodb").query;

const restaurantsController = require("./restaurantsController");

const editReply = ({ id, text }) => {
  const replyKey = `replies/${id}`;

  query`
    LET reply = DOCUMENT(${replyKey})
    UPDATE reply WITH { text: ${text} } IN replies
  `;

  return restaurantsController.getAllAsAdmin();
};

const deleteReply = ({ id }) => {
  const replyKey = `replies/${id}`;

  query`
    LET reply = DOCUMENT(${replyKey})
    UPDATE reply WITH { active: false } IN replies
  `;

  return restaurantsController.getAllAsAdmin();
};

const reply = ({ id, text, userId }) => {
  const reply = db._collection("replies").insert({
    text,
    active: true,
  });

  db._collection("hasReplied").insert({
    _from: userId,
    _to: reply._id,
  });

  db._collection("repliedFor").insert({
    _from: reply._id,
    _to: `rates/${id}`,
  });

  return restaurantsController.getOwned(userId);
};

module.exports = {
  reply,
  editReply,
  deleteReply,
};
