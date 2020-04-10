const JSONAPISerializer = require("json-api-serializer");

const RateSerializer = require("./RateSerializer");
const ReplySerializer = require("./ReplySerializer");
const AdminDataSerializer = require("./AdminDataSerializer");
const RestaurantSerializer = require("./RestaurantSerializer");
const UserRestaurantListSerializer = require("./UserRestaurantListSerializer");
const OwnerRestaurantListSerializer = require("./OwnerRestaurantListSerializer");

const Serializer = new JSONAPISerializer();

Serializer.register("rate", RateSerializer);
Serializer.register("reply", ReplySerializer);
Serializer.register("adminData", AdminDataSerializer);
Serializer.register("restaurant", RestaurantSerializer);
Serializer.register("userRestaurantList", UserRestaurantListSerializer);
Serializer.register("ownerRestaurantList", OwnerRestaurantListSerializer);

module.exports = Serializer;
