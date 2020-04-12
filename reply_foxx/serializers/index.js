const JSONAPISerializer = require("json-api-serializer");

const ReplySerializer = require("./ReplySerializer");

const Serializer = new JSONAPISerializer();

Serializer.register("reply", ReplySerializer);

module.exports = Serializer;
