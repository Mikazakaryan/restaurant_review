const JSONAPISerializer = require("json-api-serializer");

const UserSerializer = require("./UserSerializer");

const Serializer = new JSONAPISerializer();

Serializer.register("user", UserSerializer);

module.exports = Serializer;
