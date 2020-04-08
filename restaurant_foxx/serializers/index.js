const JSONAPISerializer = require("json-api-serializer");

const RateSerializer = require("./RateSerializer");
const UserRestaurantListSerializer = require("./UserRestaurantListSerializer");
const OwnerRestaurantListSerializer = require("./OwnerRestaurantListSerializer");

const Serializer = new JSONAPISerializer();

Serializer.register("rate", RateSerializer);
Serializer.register("userRestaurantList", UserRestaurantListSerializer);
Serializer.register("ownerRestaurantList", OwnerRestaurantListSerializer);

module.exports = Serializer;
