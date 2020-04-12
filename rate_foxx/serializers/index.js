const JSONAPISerializer = require("json-api-serializer");

const RateSerializer = require("./RateSerializer");

const Serializer = new JSONAPISerializer();

Serializer.register("rate", RateSerializer);

module.exports = Serializer;
