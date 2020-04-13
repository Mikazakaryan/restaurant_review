const joi = require("joi");

const Serializer = require("./serializers");
const replyController = require("./replyControllers");
const checkUserRole = require("./middlewares/checkUserRole");

module.exports = (router) => {
  router
    .get("/", checkUserRole("isAdmin"), (req, res) => {
      const data = replyController.getAll(req);
      const serializedData = Serializer.serialize("reply", data);

      res.send(serializedData);
    })
    .response(joi.object().required(), "reply collections")
    .summary("get replies")
    .description("get all replies");

  router
    .post("/", checkUserRole("isOwner"), (req, res) => {
      const Data = replyController.create(req);
      const serializedData = Serializer.serialize("reply", Data);

      res.send(serializedData);
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

  router.all("*", checkUserRole("isAdmin"));

  router
    .put("/:id", (req, res) => {
      const data = replyController.editReply(req);
      const serializedData = Serializer.serialize("reply", data);

      res.send(serializedData);
    })
    .body(
      joi
        .object({
          text: joi.string().required(),
        })
        .required(),
      "edit reply"
    )
    .pathParam("id", joi.string().required(), "key of the reply to be edited")
    .response(joi.object().required(), "admin data collections")
    .summary("edit reply")
    .description("edit reply by id");

  router
    .delete("/:id", (req, res) => {
      const data = replyController.deleteReply(req);
      const serializedData = Serializer.serialize("reply", data);

      res.send(serializedData);
    })
    .pathParam("id", joi.string().required(), "key of the reply to be deleted")
    .response(joi.object().required(), "admin data collections")
    .summary("delete reply")
    .description("delete reply by id");
};
