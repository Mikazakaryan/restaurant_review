module.exports = {
  id: '_key',
  blacklist: ['_key', '_id', '_rev'],
  relationships: {
    lastRate: {
      type: 'rate',
    },
  },
};
