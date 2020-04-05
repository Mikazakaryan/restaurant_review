const JSONAPISerializer = require('json-api-serializer');

const UserSerializer = require('./UserSerializer');
const UserRestaurantListSerializer = require('./UserRestaurantListSerializer');

const Serializer = new JSONAPISerializer();

Serializer.register('user', UserSerializer);
Serializer.register('userRestaurantList', UserRestaurantListSerializer);

module.exports = Serializer;
