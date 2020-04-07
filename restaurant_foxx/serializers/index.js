const JSONAPISerializer = require("json-api-serializer");

const RateSerializer = require("./RateSerializer");
const UserRestaurantListSerializer = require("./UserRestaurantListSerializer");

const Serializer = new JSONAPISerializer();

Serializer.register("rate", RateSerializer);
Serializer.register("userRestaurantList", UserRestaurantListSerializer);

module.exports = Serializer;
