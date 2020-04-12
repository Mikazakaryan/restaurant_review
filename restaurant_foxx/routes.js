const joi = require("joi");

const Serializer = require("./serializers");
const isAdminMiddleware = require("./middlewares/isAdmin");
const isOwnerMiddleware = require("./middlewares/isOwner");
const restaurantController = require("./restaurantController");

module.exports = (router) => {
  router
    .get("/", (req, res) => {
      const [data, serializerType] = restaurantController.getAll(req);
      const serializedData = Serializer.serialize(serializerType, data);

      res.send(serializedData);
    })
    .response(joi.object().required(), "restaurant collections")
    .summary("get restaurants")
    .description("get all restaurants");

  router
    .post("/", isOwnerMiddleware, (req, res) => {
      const restaurants = restaurantController.create(req);
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

  router.all("*", isAdminMiddleware);

  router
    .put("/:id", (req, res) => {
      const data = restaurantController.editRestaurant(req);
      const serializedData = Serializer.serialize("restaurant", data);

      res.send(serializedData);
    })
    .body(
      joi
        .object({
          name: joi.string().required(),
        })
        .required(),
      "edit restaurant"
    )
    .pathParam(
      "id",
      joi.string().required(),
      "key of the restaurant to be edited"
    )
    .response(joi.object().required(), "admin data collections")
    .summary("edit restaurant")
    .description("edit restaurant by id");

  router
    .delete("/:id", (req, res) => {
      const data = restaurantController.deleteRestaurant(req);
      const serializedData = Serializer.serialize("restaurant", data);

      res.send(serializedData);
    })
    .pathParam(
      "id",
      joi.string().required(),
      "key of the restaurant to be deleted"
    )
    .response(joi.object().required(), "admin data collections")
    .summary("delete restaurant")
    .description("delete restaurant by id");
};
