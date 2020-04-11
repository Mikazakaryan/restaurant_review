const joi = require("joi");

const Serializer = require("../serializers");
const restaurantController = require("../controllers");

module.exports = (router) => {
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

  router
    .post("/owner/reply", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "owner") res.throw("unauthorized");

      const restaurants = restaurantController.reply({
        userId: user._id,
        ...req.body,
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
          id: joi.string().required(),
          text: joi.string().required(),
        })
        .required(),
      "Reply to rate"
    )
    .response(joi.object().required(), "restaurant collection")
    .summary("reply to rate")
    .description("reply to rate by user id");
};
