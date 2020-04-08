const joi = require("joi");

const Serializer = require("../serializers");
const restaurantController = require("../controllers");

module.exports = (router) => {
  router
    .post("/user/rate", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "user") res.throw("unauthorized");

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
    .get("/user", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "user") res.throw("unauthorized");

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

  router
    .get("/owner", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "owner") res.throw("unauthorized");

      const restaurants = restaurantController.getOwned(user._id);
      const serializedRestaurants = Serializer.serialize(
        "ownerRestaurantList",
        restaurants
      );

      res.send(serializedRestaurants);
    })
    .response(joi.object().required(), "restaurant collections")
    .summary("get restaurants")
    .description("get only owned restaurants");

  router
    .post("/owner/create", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "owner") res.throw("unauthorized");

      const restaurants = restaurantController.create({
        userId: user._id,
        name: req.body.name,
      });
      const serializedRestaurants = Serializer.serialize(
        "ownerRestaurantList",
        restaurants
      );

      res.send(serializedRestaurants);
    })
    .body(
      joi
        .object({
          name: joi.string().required(),
        })
        .required(),
      "create restaurant"
    )
    .response(joi.object().required(), "restaurant collection")
    .summary("create restaurant")
    .description("create restaurant by user id");
};
