const joi = require("joi");

const Serializer = require("./serializers");
const rateController = require("./rateControllers");
const isUserMiddleware = require("./middlewares/isUser");
const isAdminMiddleware = require("./middlewares/isAdmin");

module.exports = (router) => {
  router
    .get("/", isAdminMiddleware, (req, res) => {
      const data = rateController.getAll(req);
      const serializedData = Serializer.serialize("rate", data);

      res.send(serializedData);
    })
    .response(joi.object().required(), "rate collections")
    .summary("get rates")
    .description("get all rates");

  router
    .post("/", isUserMiddleware, (req, res) => {
      const restaurants = rateController.create(req);
      const serializedRestaurants = Serializer.serialize("rate", restaurants);
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

  router.all("*", isAdminMiddleware);

  router
    .put("/:id", (req, res) => {
      const data = rateController.editRate(req, res);
      const serializedData = Serializer.serialize("rate", data);
      res.send(serializedData);
    })
    .body(
      joi
        .object({
          date: joi.string().required(),
          rating: joi.number().required(),
          comment: joi.string().required(),
        })
        .required(),
      "edit rate"
    )
    .pathParam("id", joi.string().required(), "key of the rate to be edited")
    .response(joi.object().required(), "rate collections")
    .summary("edit rate")
    .description("edit rate by id");

  router
    .delete("/:id", (req, res) => {
      const data = rateController.deleteRate(req);
      const serializedData = Serializer.serialize("rate", data);

      res.send(serializedData);
    })
    .pathParam("id", joi.string().required(), "key of the rate to be deleted")
    .response(joi.object().required(), "rate collections")
    .summary("delete rate")
    .description("delete rate by id");
};
