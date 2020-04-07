const joi = require("joi");

const Serializer = require("../serializers");
const restaurantController = require("../controllers");

module.exports = (router) => {
  router
    .post("/rate", (req, res) => {
      const user = req.currentUser;

      const restaurants = restaurantController.rate(user._id, req.body);
      const serializedRestaurants = Serializer.serialize(
        "userRestaurantList",
        restaurants
      );
      res.send(serializedRestaurants);
    })
    .body(
      joi
        .object({
          date: joi.string().required(),
          rating: joi.number().required(),
          comment: joi.string().required(),
          restaurantKey: joi.string().required(),
        })
        .required(),
      "rate restaurant"
    )
    .response(joi.object().required(), "restaurant collection")
    .summary("rate restaurant")
    .description("rate restaurant by user id and count new rating");

  router
    .get("/allForUser", (req, res) => {
      const user = req.currentUser;

      const restaurants = restaurantController.getAll(user._id);
      const serializedRestaurants = Serializer.serialize(
        "userRestaurantList",
        restaurants
      );

      res.send(serializedRestaurants);
    })
    .response(joi.object().required(), "restaurant collections")
    .summary("get restaurants")
    .description("restaurants with user key to get isRated");
};
