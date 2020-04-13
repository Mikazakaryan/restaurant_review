module.exports = {
  id: "_key",
  blacklist: ["_key", "_id", "_rev", "_oldRev"],
  relationships: {
    lastRate: {
      type: "rate",
    },
    rates: {
      type: "rate",
    },
  },
};
