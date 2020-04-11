const joi = require("joi");

const Serializer = require("../serializers");
const restaurantController = require("../controllers");

module.exports = (router) => {
  router
    .get("/admin", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "admin") res.throw("unauthorized");

      const data = restaurantController.getAllAsAdmin();
      const serializedData = Serializer.serialize("adminData", data);

      res.send(serializedData);
    })
    .response(joi.object().required(), "restaurant collections")
    .summary("get restaurants")
    .description("get all restaurants");

  router
    .put("/admin/reply", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "admin") res.throw("unauthorized");

      const data = restaurantController.editReply(req.body);
      const serializedData = Serializer.serialize("adminData", data);

      res.send(serializedData);
    })
    .body(
      joi
        .object({
          id: joi.string().required(),
          text: joi.string().required(),
        })
        .required(),
      "edit reply"
    )
    .response(joi.object().required(), "admin data collections")
    .summary("edit reply")
    .description("edit reply by id");

  router
    .delete("/admin/reply", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "admin") res.throw("unauthorized");

      const data = restaurantController.deleteReply(req.body);
      const serializedData = Serializer.serialize("adminData", data);

      res.send(serializedData);
    })
    .body(
      joi
        .object({
          id: joi.string().required(),
        })
        .required(),
      "delete reply"
    )
    .response(joi.object().required(), "admin data collections")
    .summary("delete reply")
    .description("delete reply by id");

  router
    .put("/admin/restaurant", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "admin") res.throw("unauthorized");

      const data = restaurantController.editRestaurant(req.body);
      const serializedData = Serializer.serialize("adminData", data);

      res.send(serializedData);
    })
    .body(
      joi
        .object({
          id: joi.string().required(),
          name: joi.string().required(),
        })
        .required(),
      "edit restaurant"
    )
    .response(joi.object().required(), "admin data collections")
    .summary("edit restaurant")
    .description("edit restaurant by id");

  router
    .delete("/admin/restaurant", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "admin") res.throw("unauthorized");

      const data = restaurantController.deleteRestaurant(req.body);
      const serializedData = Serializer.serialize("adminData", data);

      res.send(serializedData);
    })
    .body(
      joi
        .object({
          id: joi.string().required(),
        })
        .required(),
      "delete restaurant"
    )
    .response(joi.object().required(), "admin data collections")
    .summary("delete restaurant")
    .description("delete restaurant by id");

  router
    .put("/admin/rate", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "admin") res.throw("unauthorized");

      const [data, err] = restaurantController.editRate(req.body);
      if (err) {
        return res.throw(400, err);
      } else {
        const serializedData = Serializer.serialize("adminData", data);

        res.send(serializedData);
      }
    })
    .body(
      joi
        .object({
          id: joi.string().required(),
          date: joi.string().required(),
          rating: joi.string().required(),
          comment: joi.string().required(),
        })
        .required(),
      "edit rate"
    )
    .response(joi.object().required(), "admin data collections")
    .summary("rate reply")
    .description("rate reply by id");

  router
    .delete("/admin/rate", (req, res) => {
      const user = req.currentUser;

      if (user.role !== "admin") res.throw("unauthorized");

      const data = restaurantController.deleteRate(req.body);
      const serializedData = Serializer.serialize("adminData", data);

      res.send(serializedData);
    })
    .body(
      joi
        .object({
          id: joi.string().required(),
        })
        .required(),
      "delete edit"
    )
    .response(joi.object().required(), "admin data collections")
    .summary("delete edit")
    .description("delete edit by id");
};
