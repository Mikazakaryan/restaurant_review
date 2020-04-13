const JSONAPISerializer = require("json-api-serializer");

const RateSerializer = require("./RateSerializer");
const RestaurantSerializer = require("./RestaurantSerializer");

const Serializer = new JSONAPISerializer();

Serializer.register("rate", RateSerializer);
Serializer.register("restaurant", RestaurantSerializer);

module.exports = Serializer;
