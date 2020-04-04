const Serializer = require('../../serializers');

module.exports = (res, status, msg) =>
  res.status(status).json(
    Serializer.serializeError({
      status,
      detail: msg,
    }),
  );
